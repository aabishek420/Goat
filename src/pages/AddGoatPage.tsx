import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, ArrowLeft, Camera, X } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";

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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
      >
        <div>
          <h1 className="text-4xl font-serif font-bold text-forest mb-2">
            Add New Goat
          </h1>
          <p className="text-olive/70 font-medium">
            Register a new goat to your herd
          </p>
        </div>
        <Button
          onClick={() => navigate("/goats")}
          variant="outline"
          className="border-olive/20 hover:border-olive/40 text-forest"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Goats
        </Button>
      </motion.div>

      {/* Breadcrumb */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <nav className="flex items-center space-x-2 text-sm text-olive/70">
          <NavLink
            to="/dashboard"
            className="hover:text-forest transition-colors"
          >
            Dashboard
          </NavLink>
          <span>/</span>
          <NavLink to="/goats" className="hover:text-forest transition-colors">
            Goats
          </NavLink>
          <span>/</span>
          <span className="text-forest font-medium">Add New</span>
        </nav>
      </motion.div>

      {/* Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="border-olive/10 p-8 bg-white/50 backdrop-blur-sm rounded-3xl shadow-sm">
          <h2 className="text-2xl font-serif font-bold text-forest mb-6">
            Goat Information
          </h2>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Image Upload Section */}
            <div className="flex flex-col items-center justify-center space-y-4 pb-8 border-b border-cream">
              <div className="relative group">
                <div
                  className={`w-40 h-40 rounded-full border-2 border-dashed border-olive/30 flex items-center justify-center overflow-hidden bg-cream/30 transition-all ${
                    !imagePreview
                      ? "hover:border-olive/50 hover:bg-cream/50"
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
                        className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer flex flex-col items-center space-y-2"
                    >
                      <Camera className="w-10 h-10 text-olive/40" />
                      <span className="text-xs font-medium text-olive/60">
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
                  <div className="absolute -bottom-2 -right-2 bg-olive text-cream p-2 rounded-full shadow-lg cursor-pointer hover:bg-forest transition-colors">
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <Plus className="w-4 h-4" />
                    </label>
                  </div>
                )}
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-forest">
                  Goat Profile Image
                </p>
                <p className="text-xs text-olive/60">
                  JPG, PNG or WebP (Max 5MB)
                </p>
              </div>
            </div>

            {/* Basic Information Section */}
            <div>
              <h3 className="text-lg font-semibold text-forest mb-4 pb-2 border-b border-cream">
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Goat ID */}
                <div className="space-y-2">
                  <label
                    htmlFor="goat_id"
                    className="block text-sm font-medium text-olive"
                  >
                    Goat ID *
                  </label>
                  <input
                    type="text"
                    id="goat_id"
                    name="goat_id"
                    value={formData.goat_id}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-cream/50 border border-olive/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/30 focus:border-olive transition-all"
                    placeholder="e.g., GT-2847"
                  />
                </div>

                {/* Gender */}
                <div className="space-y-2">
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium text-olive"
                  >
                    Gender *
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-cream/50 border border-olive/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/30 focus:border-olive transition-all appearance-none"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                {/* Breed */}
                <div className="space-y-2">
                  <label
                    htmlFor="breed"
                    className="block text-sm font-medium text-olive"
                  >
                    Breed
                  </label>
                  <input
                    type="text"
                    id="breed"
                    name="breed"
                    value={formData.breed}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-cream/50 border border-olive/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/30 focus:border-olive transition-all"
                    placeholder="e.g., Sirohi, Beetal"
                  />
                </div>

                {/* Color */}
                <div className="space-y-2">
                  <label
                    htmlFor="color"
                    className="block text-sm font-medium text-olive"
                  >
                    Color
                  </label>
                  <input
                    type="text"
                    id="color"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-cream/50 border border-olive/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/30 focus:border-olive transition-all"
                    placeholder="e.g., Brown & White"
                  />
                </div>

                {/* State */}
                <div className="space-y-2">
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium text-olive"
                  >
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-cream/50 border border-olive/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/30 focus:border-olive transition-all"
                    placeholder="Enter state"
                  />
                </div>

                {/* Country */}
                <div className="space-y-2">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-olive"
                  >
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-cream/50 border border-olive/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/30 focus:border-olive transition-all"
                    placeholder="Enter country"
                  />
                </div>
              </div>
            </div>

            {/* Parent Information Section */}
            <div>
              <h3 className="text-lg font-semibold text-forest mb-4 pb-2 border-b border-cream">
                Parent Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Father Goat */}
                <div className="space-y-2">
                  <label
                    htmlFor="father_goat_id"
                    className="block text-sm font-medium text-olive"
                  >
                    Father Goat
                  </label>
                  <select
                    id="father_goat_id"
                    name="father_goat_id"
                    value={formData.father_goat_id || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-cream/50 border border-olive/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/30 focus:border-olive transition-all appearance-none"
                  >
                    <option value="">None</option>
                    {parentGoats.map((goat) => (
                      <option key={goat.id} value={goat.id}>
                        {goat.goat_id} - {goat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Mother Goat */}
                <div className="space-y-2">
                  <label
                    htmlFor="mother_goat_id"
                    className="block text-sm font-medium text-olive"
                  >
                    Mother Goat
                  </label>
                  <select
                    id="mother_goat_id"
                    name="mother_goat_id"
                    value={formData.mother_goat_id || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-cream/50 border border-olive/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/30 focus:border-olive transition-all appearance-none"
                  >
                    <option value="">None</option>
                    {parentGoats.map((goat) => (
                      <option key={goat.id} value={goat.id}>
                        {goat.goat_id} - {goat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Health & Measurements Section */}
            <div>
              <h3 className="text-lg font-semibold text-forest mb-4 pb-2 border-b border-cream">
                Health & Measurements
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Age */}
                <div className="space-y-2">
                  <label
                    htmlFor="age"
                    className="block text-sm font-medium text-olive"
                  >
                    Age (months)
                  </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-cream/50 border border-olive/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/30 focus:border-olive transition-all"
                    placeholder="e.g., 24"
                  />
                </div>

                {/* Current Weight */}
                <div className="space-y-2">
                  <label
                    htmlFor="current_weight"
                    className="block text-sm font-medium text-olive"
                  >
                    Current Weight (KG)
                  </label>
                  <input
                    type="number"
                    id="current_weight"
                    name="current_weight"
                    value={formData.current_weight}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-cream/50 border border-olive/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/30 focus:border-olive transition-all"
                    placeholder="e.g., 45"
                  />
                </div>

                {/* Sourcing Weight */}
                <div className="space-y-2">
                  <label
                    htmlFor="sourcing_weight"
                    className="block text-sm font-medium text-olive"
                  >
                    Sourcing Weight (KG)
                  </label>
                  <input
                    type="number"
                    id="sourcing_weight"
                    name="sourcing_weight"
                    value={formData.sourcing_weight}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-cream/50 border border-olive/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/30 focus:border-olive transition-all"
                    placeholder="e.g., 40"
                  />
                </div>

                {/* Baby Teeth */}
                <div className="space-y-2">
                  <label
                    htmlFor="no_of_baby_teeth"
                    className="block text-sm font-medium text-olive"
                  >
                    No. of Baby Teeth
                  </label>
                  <input
                    type="number"
                    id="no_of_baby_teeth"
                    name="no_of_baby_teeth"
                    value={formData.no_of_baby_teeth}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-cream/50 border border-olive/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/30 focus:border-olive transition-all"
                    placeholder="e.g., 8"
                  />
                </div>

                {/* Permanent Teeth */}
                <div className="space-y-2">
                  <label
                    htmlFor="no_of_permanent_teeth"
                    className="block text-sm font-medium text-olive"
                  >
                    No. of Permanent Teeth
                  </label>
                  <input
                    type="number"
                    id="no_of_permanent_teeth"
                    name="no_of_permanent_teeth"
                    value={formData.no_of_permanent_teeth}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-cream/50 border border-olive/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/30 focus:border-olive transition-all"
                    placeholder="e.g., 24"
                  />
                </div>
              </div>
            </div>

            {/* Financial Information Section */}
            <div>
              <h3 className="text-lg font-semibold text-forest mb-4 pb-2 border-b border-cream">
                Financial Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Goat Price */}
                <div className="space-y-2">
                  <label
                    htmlFor="goat_price"
                    className="block text-sm font-medium text-olive"
                  >
                    Goat Price (₹)
                  </label>
                  <input
                    type="number"
                    id="goat_price"
                    name="goat_price"
                    value={formData.goat_price}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-cream/50 border border-olive/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/30 focus:border-olive transition-all"
                    placeholder="e.g., 18000"
                  />
                </div>

                {/* Overhead Cost */}
                <div className="space-y-2">
                  <label
                    htmlFor="overhead_cost"
                    className="block text-sm font-medium text-olive"
                  >
                    Overhead Cost (₹)
                  </label>
                  <input
                    type="number"
                    id="overhead_cost"
                    name="overhead_cost"
                    value={formData.overhead_cost}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-cream/50 border border-olive/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/30 focus:border-olive transition-all"
                    placeholder="e.g., 2000"
                  />
                </div>

                {/* Procurement Cost */}
                <div className="space-y-2">
                  <label
                    htmlFor="procurement_cost"
                    className="block text-sm font-medium text-olive"
                  >
                    Procurement Cost (₹)
                  </label>
                  <input
                    type="number"
                    id="procurement_cost"
                    name="procurement_cost"
                    value={formData.procurement_cost}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-cream/50 border border-olive/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/30 focus:border-olive transition-all"
                    placeholder="e.g., 20000"
                  />
                </div>
              </div>
            </div>

            {/* Dates Section */}
            <div>
              <h3 className="text-lg font-semibold text-forest mb-4 pb-2 border-b border-cream">
                Important Dates
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Sourcing Date */}
                <div className="space-y-2">
                  <label
                    htmlFor="sourcing_date"
                    className="block text-sm font-medium text-olive"
                  >
                    Sourcing Date
                  </label>
                  <input
                    type="date"
                    id="sourcing_date"
                    name="sourcing_date"
                    value={formData.sourcing_date}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-cream/50 border border-olive/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/30 focus:border-olive transition-all"
                  />
                </div>

                {/* Weighing Date */}
                <div className="space-y-2">
                  <label
                    htmlFor="weighing_date"
                    className="block text-sm font-medium text-olive"
                  >
                    Weighing Date
                  </label>
                  <input
                    type="date"
                    id="weighing_date"
                    name="weighing_date"
                    value={formData.weighing_date}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-cream/50 border border-olive/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive/30 focus:border-olive transition-all"
                  />
                </div>
              </div>
            </div>

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
                    className="h-5 w-5 text-olive border-olive/30 rounded focus:ring-olive/50"
                  />
                  <label
                    htmlFor="is_tagged"
                    className="text-sm font-medium text-olive"
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
                    className="h-5 w-5 text-olive border-olive/30 rounded focus:ring-olive/50"
                  />
                  <label
                    htmlFor="is_selling_ready"
                    className="text-sm font-medium text-olive"
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
                    className="h-5 w-5 text-olive border-olive/30 rounded focus:ring-olive/50"
                  />
                  <label
                    htmlFor="sold_out"
                    className="text-sm font-medium text-olive"
                  >
                    Sold Out
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="pt-6 border-t border-cream"
            >
              <Button
                type="submit"
                className="w-full md:w-auto bg-olive hover:bg-forest text-cream shadow-lg hover:shadow-xl transition-all px-8 py-6 text-lg font-medium rounded-2xl"
              >
                <Plus className="w-5 h-5 mr-3" />
                Add Goat to Herd
              </Button>
            </motion.div>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default AddGoatPage;
