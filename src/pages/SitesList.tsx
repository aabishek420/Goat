import { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Pencil, Eye } from "lucide-react";
import { DataTable } from "@/components/common/DataTable";
import type { Column } from "@/components/common/DataTable";

interface Site {
  id: number;
  site_name: string;
  location: string;
  ownership_type: string;
  size: number;
  uom: string;
  monthly_rental_cost: number;
}

export default function SitesList() {
  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const staticSites: Site[] = [
      {
        id: 1,
        site_name: "Main Farm Site",
        location: "123 Main Street, Rural Area",
        ownership_type: "Own",
        size: 500,
        uom: "cent",
        monthly_rental_cost: 5000,
      },
      {
        id: 2,
        site_name: "Rental Pasture",
        location: "456 Farm Road, Countryside",
        ownership_type: "Rental",
        size: 300,
        uom: "cent",
        monthly_rental_cost: 4500,
      },
      {
        id: 3,
        site_name: "Leased Grazing Land",
        location: "789 Valley Lane, Hillside",
        ownership_type: "Lease",
        size: 400,
        uom: "cent",
        monthly_rental_cost: 3600,
      },
      {
        id: 4,
        site_name: "Secondary Site",
        location: "321 Backup Road, Reserve Area",
        ownership_type: "Own",
        size: 250,
        uom: "cent",
        monthly_rental_cost: 2000,
      },
    ];

    setTimeout(() => {
      setSites(staticSites);
      setLoading(false);
    }, 600);
  }, []);

  const columns: Column<Site>[] = useMemo(
    () => [
      { key: "site_name", label: "Site Name", sortable: true },
      { key: "location", label: "Location" },
      { key: "ownership_type", label: "Ownership", sortable: true },
      { key: "size", label: "Size", sortable: true },
      { key: "uom", label: "UOM" },
      {
        key: "monthly_rental_cost",
        label: "Monthly Cost",
        sortable: true,
        render: (row: Site) => `₹${row.monthly_rental_cost.toLocaleString()}`,
      },
      {
        key: "id",
        label: "Actions",
        render: (row: Site) => (
          <div className="flex items-center gap-3">
            <Link
              to={`/sites/${row.id}`}
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              <Pencil className="h-4 w-4" />
              Edit
            </Link>

            <Link
              to={`/sites/view/${row.id}`}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary hover:underline"
            >
              <Eye className="h-4 w-4" />
              View
            </Link>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div className="p-6">
      <DataTable
        title="Sites"
        subtitle="Manage your farm locations and assets"
        columns={columns}
        data={sites}
        loading={loading}
        onAdd={() => navigate("/sites/add")}
      />
    </div>
  );
}
