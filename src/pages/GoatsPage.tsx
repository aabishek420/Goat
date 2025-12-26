import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Filter, Search, Grid, List } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { GoatCard } from "../components/goat/GoatCard";
import type { Goat } from "../types/index";
import { Card } from "../components/ui/card";

export function GoatsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock goat data
  const goats: Goat[] = [
    {
      id: "1",
      name: "Raja",
      tagId: "GT-2841",
      breed: "Sirohi",
      gender: "male",
      birthDate: "2022-03-15",
      weight: 45,
      height: 75,
      color: "Brown & White",
      purchasePrice: 18000,
      currentValue: 24000,
      photos: [
        "https://images.unsplash.com/photo-1533318087102-b3ad366ed041?w=400",
      ],
      healthRecords: [],
      breedingHistory: [],
      location: "Shed A-1",
      feedSchedule: [],
      status: "healthy",
    },
    {
      id: "2",
      name: "Rani",
      tagId: "GT-2842",
      breed: "Beetal",
      gender: "female",
      birthDate: "2021-07-22",
      weight: 38,
      height: 68,
      color: "Black & Brown",
      purchasePrice: 20000,
      currentValue: 26000,
      photos: [
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400",
      ],
      healthRecords: [],
      breedingHistory: [],
      location: "Shed A-2",
      feedSchedule: [],
      status: "pregnant",
    },
    {
      id: "3",
      name: "Sheru",
      tagId: "GT-2843",
      breed: "Jamunapari",
      gender: "male",
      birthDate: "2020-11-10",
      weight: 52,
      height: 82,
      color: "White",
      purchasePrice: 25000,
      currentValue: 32000,
      photos: [
        "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400",
      ],
      healthRecords: [],
      breedingHistory: [],
      location: "Shed B-1",
      feedSchedule: [],
      status: "healthy",
    },
    {
      id: "4",
      name: "Lakshmi",
      tagId: "GT-2844",
      breed: "Barbari",
      gender: "female",
      birthDate: "2022-05-18",
      weight: 35,
      height: 62,
      color: "Brown",
      purchasePrice: 14000,
      currentValue: 18000,
      photos: [
        "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400",
      ],
      healthRecords: [],
      breedingHistory: [],
      location: "Shed A-3",
      feedSchedule: [],
      status: "healthy",
    },
    {
      id: "5",
      name: "Moti",
      tagId: "GT-2845",
      breed: "Sirohi",
      gender: "female",
      birthDate: "2021-09-25",
      weight: 41,
      height: 71,
      color: "White & Brown",
      purchasePrice: 17000,
      currentValue: 22000,
      photos: [
        "https://images.unsplash.com/photo-1562808756-e0852e5a83b7?w=400",
      ],
      healthRecords: [],
      breedingHistory: [],
      location: "Shed B-2",
      feedSchedule: [],
      status: "healthy",
    },
    {
      id: "6",
      name: "Kalu",
      tagId: "GT-2846",
      breed: "Beetal",
      gender: "male",
      birthDate: "2023-01-12",
      weight: 28,
      height: 58,
      color: "Black",
      purchasePrice: 16000,
      currentValue: 19000,
      photos: [
        "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400",
      ],
      healthRecords: [],
      breedingHistory: [],
      location: "Shed A-4",
      feedSchedule: [],
      status: "sick",
    },
  ];

  const handleViewGoat = (goat: Goat) => {
    const message = `Opening detailed view for ${goat.name} (${goat.tagId})`;
    alert(message);
  };

  const filteredGoats = goats.filter(
    (goat) =>
      goat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      goat.tagId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      goat.breed.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
      >
        <div>
          <h1 className="text-4xl font-serif font-bold text-forest mb-2">
            My Goats
          </h1>
          <p className="text-olive/70 font-medium">
            Manage your herd and track performance
          </p>
        </div>
        <Button className="bg-olive hover:bg-forest text-cream shadow-lg hover:shadow-xl transition-all">
          <Plus className="w-4 h-4 mr-2" />
          Add New Goat
        </Button>
      </motion.div>

      {/* Filters & Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border-olive/10 p-6 bg-white/50 backdrop-blur-sm rounded-3xl shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-olive/40" />
              <Input
                placeholder="Search by name, tag ID, or breed..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-cream/50 border-olive/10 focus:border-olive"
              />
            </div>

            {/* Filter Button */}
            <Button
              variant="outline"
              className="border-olive/20 hover:border-olive/40"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>

            {/* View Toggle */}
            <div className="flex gap-1 bg-cream/50 p-1 rounded-xl border border-olive/5">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={`rounded-lg ${
                  viewMode === "grid" ? "bg-white shadow-sm" : ""
                }`}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={`rounded-lg ${
                  viewMode === "list" ? "bg-white shadow-sm" : ""
                }`}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6"
      >
        {[
          {
            label: "Total",
            value: goats.length,
            color: "from-olive to-forest",
          },
          {
            label: "Healthy",
            value: goats.filter((g) => g.status === "healthy").length,
            color: "from-green-600 to-green-700",
          },
          {
            label: "Pregnant",
            value: goats.filter((g) => g.status === "pregnant").length,
            color: "from-blue-600 to-blue-700",
          },
          {
            label: "Need Care",
            value: goats.filter((g) => g.status === "sick").length,
            color: "from-red-600 to-red-700",
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <Card className="border-olive/10 p-6 bg-white/50 backdrop-blur-sm rounded-3xl shadow-sm">
              <p className="text-xs font-bold text-olive/50 uppercase tracking-widest mb-1">
                {stat.label}
              </p>
              <p className="text-3xl font-serif font-bold text-forest">
                {stat.value}
              </p>
              <div className="mt-4 h-1.5 bg-cream rounded-full overflow-hidden">
                <div className={`h-full bg-linear-to-r ${stat.color} w-full`} />
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Goats Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className={`grid gap-8 ${
          viewMode === "grid"
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1"
        }`}
      >
        {filteredGoats.map((goat, index) => (
          <motion.div
            key={goat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            <GoatCard goat={goat} onView={handleViewGoat} />
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {filteredGoats.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <div className="w-24 h-24 mx-auto mb-6 bg-cream rounded-full flex items-center justify-center shadow-inner">
            <Search className="w-10 h-10 text-olive/30" />
          </div>
          <h3 className="text-2xl font-serif font-bold text-forest mb-2">
            No goats found
          </h3>
          <p className="text-olive/60 font-medium">
            Try adjusting your search or filters
          </p>
        </motion.div>
      )}
    </div>
  );
}
