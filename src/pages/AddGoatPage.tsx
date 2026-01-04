import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { Plus, ArrowLeft, Camera, X } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input, Select, FormSection } from "../components/ui/form";

const AddGoatPage: React.FC = () => {
  const navigate = useNavigate();

  // Static parent goats data
  const parentGoats = [
    { id: "1", goat_id: "GT-2841", name: "Raja" },
    { id: "2", goat_id: "GT-2842", name: "Rani" },
    { id: "3", goat_id: "GT-2843", name: "Sheru" },
    { id: "4", goat_id: "GT-2844", name: "Lakshmi" },
    { id: "5", goat_id: "GT-2845", name: "Moti" },
    { id: "6", goat_id: "GT-2846", name: "Kalu" },
  ];

  const [formData, setFormData] = useState({
    goat_id: "",
    is_tagged: false,
    gender: "",
    breed: "",
    color: "",
    state: "",
    country: "",
    father_goat_id: null as string | null,
    mother_goat_id: null as string | null,
    uom: "KG",
    sourcing_weight: "",
    current_weight: "",
    sourcing_date: "",
    weighing_date: "",
    no_of_baby_teeth: "",
    no_of_permanent_teeth: "",
    age: "",
    goat_price: "",
    overhead_cost: "",
    procurement_cost: "",
    is_selling_ready: false,
    sold_out: false,
  });

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value, type } = target;
    if (name === "father_goat_id" || name === "mother_goat_id") {
      setFormData((prev) => ({
        ...prev,
        [name]: value === "" ? null : value,
      }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: (target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with data:", { ...formData, image });

    // Mock successful submission
    const message = `Goat ${formData.goat_id} added successfully!`;
    alert(message);
    navigate("/goats");
  };

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Add New Goat
          </h1>
          <p className="text-muted-foreground">
            Register a new goat to your herd
          </p>
        </div>
        <Button
          onClick={() => navigate("/goats")}
          variant="outline"
          className="border-border hover:border-primary"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Goats
        </Button>
      </div>

      {/* Breadcrumb */}
      <div>
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
          <NavLink
            to="/dashboard"
            className="hover:text-foreground transition-colors"
          >
            Dashboard
          </NavLink>
          <span>/</span>
          <NavLink
            to="/goats"
            className="hover:text-foreground transition-colors"
          >
            Goats
          </NavLink>
          <span>/</span>
          <span className="text-foreground font-medium">Add New</span>
        </nav>
      </div>

      {/* Form Card */}
      <div>
        <Card className="border-border p-6 bg-card rounded-xl shadow">
          <h2 className="text-xl font-bold text-foreground mb-6">
            Goat Information
          </h2>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Image Upload Section */}
            <div className="flex flex-col items-center justify-center space-y-4 pb-8 border-b">
              <div className="relative">
                <div
                  className={`w-40 h-40 rounded-full border-2 border-dashed border-border flex items-center justify-center overflow-hidden bg-muted/30 ${
                    !imagePreview
                      ? "hover:border-primary/50 hover:bg-muted/50"
                      : ""
                  }`}
                >
                  {imagePreview ? (
                    <>
                      <img
                        src={imagePreview}
                        alt="Goat Preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full shadow"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer flex flex-col items-center space-y-2"
                    >
                      <Camera className="w-10 h-10 text-muted-foreground" />
                      <span className="text-xs font-medium text-muted-foreground">
                        Upload Photo
                      </span>
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </label>
                  )}
                </div>
                {!imagePreview && (
                  <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground p-2 rounded-full shadow cursor-pointer hover:bg-primary/90">
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <Plus className="w-4 h-4" />
                    </label>
                  </div>
                )}
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-foreground">
                  Goat Profile Image
                </p>
                <p className="text-xs text-muted-foreground">
                  JPG, PNG or WebP (Max 5MB)
                </p>
              </div>
            </div>

            {/* Basic Information Section */}
            <FormSection title="Basic Information">
              <Input
                label="Goat ID *"
                id="goat_id"
                name="goat_id"
                value={formData.goat_id}
                onChange={handleChange}
                required
                placeholder="e.g., GT-2847"
              />

              <Select
                label="Gender *"
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Select>

              <Input
                label="Breed"
                id="breed"
                name="breed"
                value={formData.breed}
                onChange={handleChange}
                placeholder="e.g., Sirohi, Beetal"
              />

              <Input
                label="Color"
                id="color"
                name="color"
                value={formData.color}
                onChange={handleChange}
                placeholder="e.g., Brown & White"
              />

              <Input
                label="State"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="Enter state"
              />

              <Input
                label="Country"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Enter country"
              />
            </FormSection>

            {/* Parent Information Section */}
            <FormSection title="Parent Information">
              <Select
                label="Father Goat"
                id="father_goat_id"
                name="father_goat_id"
                value={formData.father_goat_id || ""}
                onChange={handleChange}
              >
                <option value="">None</option>
                {parentGoats.map((goat) => (
                  <option key={goat.id} value={goat.id}>
                    {goat.goat_id} - {goat.name}
                  </option>
                ))}
              </Select>

              <Select
                label="Mother Goat"
                id="mother_goat_id"
                name="mother_goat_id"
                value={formData.mother_goat_id || ""}
                onChange={handleChange}
              >
                <option value="">None</option>
                {parentGoats.map((goat) => (
                  <option key={goat.id} value={goat.id}>
                    {goat.goat_id} - {goat.name}
                  </option>
                ))}
              </Select>
            </FormSection>

            {/* Health & Measurements Section */}
            <FormSection title="Health & Measurements">
              <Input
                label="Age (months)"
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="e.g., 24"
              />

              <Input
                label="Current Weight (KG)"
                type="number"
                id="current_weight"
                name="current_weight"
                value={formData.current_weight}
                onChange={handleChange}
                placeholder="e.g., 45"
              />

              <Input
                label="Sourcing Weight (KG)"
                type="number"
                id="sourcing_weight"
                name="sourcing_weight"
                value={formData.sourcing_weight}
                onChange={handleChange}
                placeholder="e.g., 40"
              />

              <Input
                label="No. of Baby Teeth"
                type="number"
                id="no_of_baby_teeth"
                name="no_of_baby_teeth"
                value={formData.no_of_baby_teeth}
                onChange={handleChange}
                placeholder="e.g., 8"
              />

              <Input
                label="No. of Permanent Teeth"
                type="number"
                id="no_of_permanent_teeth"
                name="no_of_permanent_teeth"
                value={formData.no_of_permanent_teeth}
                onChange={handleChange}
                placeholder="e.g., 24"
              />
            </FormSection>

            {/* Financial Information Section */}
            <FormSection title="Financial Information">
              <Input
                label="Goat Price (₹)"
                type="number"
                id="goat_price"
                name="goat_price"
                value={formData.goat_price}
                onChange={handleChange}
                placeholder="e.g., 18000"
              />

              <Input
                label="Overhead Cost (₹)"
                type="number"
                id="overhead_cost"
                name="overhead_cost"
                value={formData.overhead_cost}
                onChange={handleChange}
                placeholder="e.g., 2000"
              />

              <Input
                label="Procurement Cost (₹)"
                type="number"
                id="procurement_cost"
                name="procurement_cost"
                value={formData.procurement_cost}
                onChange={handleChange}
                placeholder="e.g., 20000"
              />
            </FormSection>

            {/* Dates Section */}
            <FormSection title="Important Dates">
              <Input
                label="Sourcing Date"
                type="date"
                id="sourcing_date"
                name="sourcing_date"
                value={formData.sourcing_date}
                onChange={handleChange}
              />

              <Input
                label="Weighing Date"
                type="date"
                id="weighing_date"
                name="weighing_date"
                value={formData.weighing_date}
                onChange={handleChange}
              />
            </FormSection>

            {/* Checkboxes Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="is_tagged"
                    name="is_tagged"
                    checked={formData.is_tagged}
                    onChange={handleChange}
                    className="h-5 w-5 text-primary border-border rounded focus:ring-primary/50"
                  />
                  <label
                    htmlFor="is_tagged"
                    className="text-sm font-medium text-foreground"
                  >
                    Is Tagged
                  </label>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="is_selling_ready"
                    name="is_selling_ready"
                    checked={formData.is_selling_ready}
                    onChange={handleChange}
                    className="h-5 w-5 text-primary border-border rounded focus:ring-primary/50"
                  />
                  <label
                    htmlFor="is_selling_ready"
                    className="text-sm font-medium text-foreground"
                  >
                    Is Selling Ready
                  </label>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="sold_out"
                    name="sold_out"
                    checked={formData.sold_out}
                    onChange={handleChange}
                    className="h-5 w-5 text-primary border-border rounded focus:ring-primary/50"
                  />
                  <label
                    htmlFor="sold_out"
                    className="text-sm font-medium text-foreground"
                  >
                    Sold Out
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t">
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow hover:shadow-md px-8 py-4 text-base font-medium rounded-lg"
              >
                <Plus className="w-5 h-5 mr-3" />
                Add Goat to Herd
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default AddGoatPage;
