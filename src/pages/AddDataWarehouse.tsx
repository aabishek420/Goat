import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { Plus, ArrowLeft } from "lucide-react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input, Select, Textarea, FormSection } from "@/components/ui/form";

const WAREHOUSE_TYPES = ["Farm", "Distribution", "Transit"];

const AddDataWarehouse: React.FC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    warehouse_name: "",
    warehouse_type: "",
    site: "",
    location: "",
    vehicle_registration_number: "",
    warehouse_built_cost: "",
    durable_month: "",
    length: "",
    width: "",
    capacity: "",
    description: "",
  });

  const sites = [
    { id: "1", name: "Main Farm" },
    { id: "2", name: "North Pasture" },
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const monthlyCost =
    form.warehouse_built_cost && form.durable_month
      ? ((+form.warehouse_built_cost * 0.18) / +form.durable_month).toFixed(2)
      : "0.00";

  const totalArea =
    form.length && form.width
      ? (+form.length * +form.width).toFixed(2)
      : "0.00";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Warehouse:", form);
    alert("Warehouse saved successfully!");
    navigate("/warehouses");
  };

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Add New Warehouse
          </h1>
          <p className="text-muted-foreground">
            Register warehouse infrastructure
          </p>
        </div>
        <Button
          onClick={() => navigate("/warehouses")}
          variant="outline"
          className="border-border hover:border-primary"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Warehouses
        </Button>
      </div>

      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
        <NavLink to="/dashboard" className="hover:text-foreground">
          Dashboard
        </NavLink>
        <span>/</span>
        <NavLink to="/warehouses" className="hover:text-foreground">
          Warehouses
        </NavLink>
        <span>/</span>
        <span className="text-foreground font-medium">Add New</span>
      </nav>

      {/* Form */}
      <Card className="border-border p-6 bg-card rounded-xl shadow">
        <h2 className="text-xl font-bold text-foreground mb-6">
          Warehouse Information
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          <FormSection title="Basic Information">
            <Input
              label="Warehouse Name *"
              name="warehouse_name"
              value={form.warehouse_name}
              onChange={handleChange}
            />
            <Select
              label="Warehouse Type *"
              name="warehouse_type"
              value={form.warehouse_type}
              onChange={handleChange}
            >
              <option value="">Select Warehouse Type *</option>
              {WAREHOUSE_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
            <Select
              label="Site *"
              name="site"
              value={form.site}
              onChange={handleChange}
            >
              <option value="">Select Site *</option>
              {sites.map((s) => (
                <option key={s.id} value={s.name}>
                  {s.name}
                </option>
              ))}
            </Select>
            <Textarea
              label="Location"
              name="location"
              value={form.location}
              onChange={handleChange}
            />
          </FormSection>

          {form.warehouse_type === "Transit" && (
            <FormSection title="Vehicle Information">
              <Input
                label="Vehicle Registration Number *"
                name="vehicle_registration_number"
                value={form.vehicle_registration_number}
                onChange={handleChange}
              />
            </FormSection>
          )}

          <FormSection title="Financial Information">
            <Input
              label="Warehouse Built Cost *"
              name="warehouse_built_cost"
              value={form.warehouse_built_cost}
              onChange={handleChange}
            />
            <Input
              label="Durable Month *"
              name="durable_month"
              value={form.durable_month}
              onChange={handleChange}
            />
            <Input
              label="Monthly Warehouse Cost"
              value={monthlyCost}
              readOnly
            />
          </FormSection>

          <FormSection title="Physical Specifications">
            <Input
              label="Length"
              name="length"
              value={form.length}
              onChange={handleChange}
            />
            <Input
              label="Width"
              name="width"
              value={form.width}
              onChange={handleChange}
            />
            <Input label="Total Area" value={totalArea} readOnly />
            <Input
              label="Capacity *"
              name="capacity"
              value={form.capacity}
              onChange={handleChange}
            />
          </FormSection>

          <FormSection title="Additional Information">
            <Textarea
              label="Description"
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </FormSection>

          <div className="pt-6 border-t">
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow px-8 py-4 text-base rounded-lg">
              <Plus className="w-5 h-5 mr-3" />
              Save Warehouse
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AddDataWarehouse;
