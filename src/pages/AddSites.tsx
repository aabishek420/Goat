import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { Plus, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input, Select, Textarea, FormSection } from "@/components/ui/form";

const AddSitesPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    site_name: "",
    location: "",
    ownership_type: "",
    uom: "cent",
    size: "",
    property_cost: "",
    rental_cost_per_uom: "",
    lease_amount_paid: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Site Submitted:", formData);
    alert("Site saved successfully!");
    navigate("/sites");
  };

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Add New Site
          </h1>
          <p className="text-muted-foreground">Register a new farm location</p>
        </div>
        <Button
          onClick={() => navigate("/sites")}
          variant="outline"
          className="border-border hover:border-primary"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Sites
        </Button>
      </div>

      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
        <NavLink to="/dashboard" className="hover:text-foreground">
          Dashboard
        </NavLink>
        <span>/</span>
        <NavLink to="/sites" className="hover:text-foreground">
          Sites
        </NavLink>
        <span>/</span>
        <span className="text-foreground font-medium">Add New</span>
      </nav>

      {/* Form */}
      <Card className="border-border p-6 bg-card rounded-xl shadow">
        <h2 className="text-xl font-bold text-foreground mb-6">
          Site Information
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          <FormSection title="Basic Information">
            <Input
              label="Site Name *"
              name="site_name"
              value={formData.site_name}
              onChange={handleChange}
            />
            <Textarea
              label="Location *"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />

            <Select
              label="Ownership Type *"
              name="ownership_type"
              value={formData.ownership_type}
              onChange={handleChange}
            >
              <option value="">Select Ownership Type *</option>
              {["Own", "Rental", "Lease"].map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </Select>

            <Input
              label="Size *"
              name="size"
              value={formData.size}
              onChange={handleChange}
            />
            <Input
              label="Unit of Measurement *"
              name="uom"
              value={formData.uom}
              onChange={handleChange}
            />
            <Input
              label="Property Cost"
              name="property_cost"
              value={formData.property_cost}
              onChange={handleChange}
            />
          </FormSection>

          {formData.ownership_type === "Lease" && (
            <FormSection title="Lease Details">
              <Input
                label="Lease Amount Paid *"
                name="lease_amount_paid"
                value={formData.lease_amount_paid}
                onChange={handleChange}
              />
            </FormSection>
          )}

          {(formData.ownership_type === "Own" ||
            formData.ownership_type === "Rental") && (
            <FormSection title="Rental Details">
              <Input
                label="Rental Cost per UOM *"
                name="rental_cost_per_uom"
                value={formData.rental_cost_per_uom}
                onChange={handleChange}
              />
            </FormSection>
          )}

          <div className="pt-6 border-t">
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow px-8 py-4 text-base rounded-lg">
              <Plus className="w-5 h-5 mr-3" />
              Save Site
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AddSitesPage;
