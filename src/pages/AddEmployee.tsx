import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { Plus, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input, Select, FormSection } from "@/components/ui/form";

const AddEmployeePage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    user: "",
    name: "",
    designation: "",
    primary_role: "",
    contact_info: "",
    date_of_birth: "",
    date_of_hire: "",
    salary: "",
    supervisor: "",
  });

  const users = [
    { id: "1", name: "user1@example.com" },
    { id: "2", name: "user2@example.com" },
  ];

  const roles = [
    { id: "1", name: "Manager" },
    { id: "2", name: "Veterinarian" },
    { id: "3", name: "Worker" },
  ];

  const supervisors = [
    { id: "1", name: "John Doe" },
    { id: "2", name: "Jane Smith" },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Employee Submitted:", formData);
    alert("Employee added successfully!");
    navigate("/employees");
  };

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Add New Employee
          </h1>
          <p className="text-muted-foreground">
            Register a new employee in your organization
          </p>
        </div>
        <Button
          onClick={() => navigate("/employees")}
          variant="outline"
          className="border-border hover:border-primary"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Employees
        </Button>
      </div>

      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
        <NavLink to="/dashboard" className="hover:text-foreground">
          Dashboard
        </NavLink>
        <span>/</span>
        <NavLink to="/employees" className="hover:text-foreground">
          Employees
        </NavLink>
        <span>/</span>
        <span className="text-foreground font-medium">Add New</span>
      </nav>

      {/* Form Card */}
      <Card className="border-border p-6 bg-card rounded-xl shadow">
        <h2 className="text-xl font-bold text-foreground mb-6">
          Employee Information
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <FormSection title="Basic Information">
            <Input
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <Input
              label="Designation"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
            />
            <Input
              label="Contact Info"
              name="contact_info"
              value={formData.contact_info}
              onChange={handleChange}
            />
          </FormSection>

          {/* Work Details */}
          <FormSection title="Work Details">
            <Select
              label="User"
              name="user"
              value={formData.user}
              onChange={handleChange}
            >
              <option value="">Select User</option>
              {users.map((user) => (
                <option key={user.id} value={user.name}>
                  {user.name}
                </option>
              ))}
            </Select>
            <Select
              label="Primary Role"
              name="primary_role"
              value={formData.primary_role}
              onChange={handleChange}
            >
              <option value="">Select Primary Role</option>
              {roles.map((role) => (
                <option key={role.id} value={role.name}>
                  {role.name}
                </option>
              ))}
            </Select>
            <Select
              label="Supervisor"
              name="supervisor"
              value={formData.supervisor}
              onChange={handleChange}
            >
              <option value="">Select Supervisor</option>
              {supervisors.map((supervisor) => (
                <option key={supervisor.id} value={supervisor.name}>
                  {supervisor.name}
                </option>
              ))}
            </Select>
          </FormSection>

          {/* Dates */}
          <FormSection title="Important Dates">
            <Input
              type="date"
              label="Date of Birth"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleChange}
            />
            <Input
              type="date"
              label="Date of Hire"
              name="date_of_hire"
              value={formData.date_of_hire}
              onChange={handleChange}
            />
          </FormSection>

          {/* Salary */}
          <FormSection title="Compensation">
            <Input
              label="Salary"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
            />
          </FormSection>

          {/* Submit */}
          <div className="pt-6 border-t">
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow px-8 py-4 text-base rounded-lg">
              <Plus className="w-5 h-5 mr-3" />
              Add Employee
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AddEmployeePage;

/* ---------- Reusable UI Blocks ---------- */
