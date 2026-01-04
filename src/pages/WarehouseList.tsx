import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import { DataTable } from "@/components/common/DataTable";
import type { Column } from "@/components/common/DataTable";

interface Warehouse {
  id: number;
  warehouse_id: string;
  warehouse_name: string;
  warehouse_type: "Farm" | "Distribution" | "Transit";
  location: string;
  warehouse_built_cost: number;
  monthly_warehouse_cost: number;
  capacity: number;
  is_active: boolean;
}

export default function WarehouseList() {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const mockData: Warehouse[] = [
      {
        id: 1,
        warehouse_id: "WH-001",
        warehouse_name: "Main Farm Storage",
        warehouse_type: "Farm",
        location: "Rural Sector 12",
        warehouse_built_cost: 1200000,
        monthly_warehouse_cost: 45000,
        capacity: 600,
        is_active: true,
      },
      {
        id: 2,
        warehouse_id: "WH-002",
        warehouse_name: "Distribution Hub",
        warehouse_type: "Distribution",
        location: "City Outskirts",
        warehouse_built_cost: 2200000,
        monthly_warehouse_cost: 80000,
        capacity: 1000,
        is_active: true,
      },
      {
        id: 3,
        warehouse_id: "WH-003",
        warehouse_name: "Transit Depot",
        warehouse_type: "Transit",
        location: "Highway Junction",
        warehouse_built_cost: 900000,
        monthly_warehouse_cost: 30000,
        capacity: 400,
        is_active: false,
      },
    ];

    setTimeout(() => {
      setWarehouses(mockData);
      setLoading(false);
    }, 600);
  }, []);

  const statusBadge = (active: boolean) => (
    <span
      className={`rounded-full px-2 py-1 text-xs font-semibold ${
        active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
      }`}
    >
      {active ? "Active" : "Inactive"}
    </span>
  );

  const typeBadge = (type: Warehouse["warehouse_type"]) => {
    const map = {
      Farm: "bg-blue-100 text-blue-800",
      Distribution: "bg-green-100 text-green-800",
      Transit: "bg-orange-100 text-orange-800",
    };
    return (
      <span
        className={`rounded-full px-2 py-1 text-xs font-semibold ${map[type]}`}
      >
        {type}
      </span>
    );
  };

  const columns: Column<Warehouse>[] = useMemo(
    () => [
      { key: "warehouse_id", label: "ID", sortable: true },
      { key: "warehouse_name", label: "Name", sortable: true },
      {
        key: "warehouse_type",
        label: "Type",
        sortable: true,
        render: (row: Warehouse) => typeBadge(row.warehouse_type),
      },
      { key: "location", label: "Location" },
      {
        key: "warehouse_built_cost",
        label: "Built Cost",
        sortable: true,
        render: (row: Warehouse) =>
          `₹${row.warehouse_built_cost.toLocaleString()}`,
      },
      {
        key: "monthly_warehouse_cost",
        label: "Monthly Cost",
        sortable: true,
        render: (row: Warehouse) =>
          `₹${row.monthly_warehouse_cost.toLocaleString()}`,
      },
      {
        key: "capacity",
        label: "Capacity",
        sortable: true,
        render: (row: Warehouse) => `${row.capacity} goats`,
      },
      {
        key: "is_active",
        label: "Status",
        sortable: true,
        render: (row: Warehouse) => statusBadge(row.is_active),
      },
      {
        key: "id",
        label: "Actions",
        render: (row: Warehouse) => (
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(`/warehouses/edit/${row.id}`)}
              className="inline-flex items-center gap-1 text-primary hover:underline"
            >
              <Pencil className="h-4 w-4" /> Edit
            </button>

            <button
              onClick={() => alert("Delete coming soon")}
              className="inline-flex items-center gap-1 text-destructive hover:underline"
            >
              <Trash2 className="h-4 w-4" /> Delete
            </button>
          </div>
        ),
      },
    ],
    [navigate]
  );

  return (
    <div className="p-6">
      <DataTable
        title="Warehouses"
        subtitle="Manage warehouse infrastructure & capacity"
        columns={columns}
        data={warehouses}
        loading={loading}
        onAdd={() => navigate("/warehouses/add")}
      />
    </div>
  );
}
