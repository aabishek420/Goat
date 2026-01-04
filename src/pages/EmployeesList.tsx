import { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Pencil } from "lucide-react";
import { DataTable } from "@/components/common/DataTable";
import type { Column } from "@/components/common/DataTable";

interface Employee {
  id: number;
  name: string;
  designation: string;
  contact_info: string;
  date_of_hire: string;
}

export default function EmployeeList() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const staticEmployees: Employee[] = [
      {
        id: 1,
        name: "John Doe",
        designation: "Farm Manager",
        contact_info: "+1-234-567-8900",
        date_of_hire: "2023-01-15",
      },
      {
        id: 2,
        name: "Jane Smith",
        designation: "Veterinarian",
        contact_info: "+1-234-567-8901",
        date_of_hire: "2023-03-20",
      },
      {
        id: 3,
        name: "Bob Johnson",
        designation: "Goat Herder",
        contact_info: "+1-234-567-8902",
        date_of_hire: "2023-05-10",
      },
    ];

    setTimeout(() => {
      setEmployees(staticEmployees);
      setLoading(false);
    }, 600);
  }, []);

  const columns: Column<Employee>[] = useMemo(
    () => [
      { key: "name", label: "Name", sortable: true },
      { key: "designation", label: "Designation", sortable: true },
      { key: "contact_info", label: "Contact" },
      { key: "date_of_hire", label: "Date of Hire", sortable: true },
      {
        key: "id",
        label: "Actions",
        render: (row: Employee) => (
          <Link
            to={`/employees/${row.id}`}
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            <Pencil className="h-4 w-4" />
            Edit
          </Link>
        ),
      },
    ],
    []
  );

  return (
    <div className="p-6">
      <DataTable
        title="Employees"
        subtitle="Manage your farm staff and roles"
        columns={columns}
        data={employees}
        loading={loading}
        onAdd={() => navigate("/employees/add")}
      />
    </div>
  );
}
