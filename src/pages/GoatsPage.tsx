import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GoatCard } from "../components/common/GoatCard";
import type { Goat } from "../types/index";
import { Card } from "@/components/ui/card";

export function GoatsPage() {
  const navigate = useNavigate();
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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Goat Herd</h1>
          <p className="text-muted-foreground">
            Manage and track your livestock
          </p>
        </div>
        <Button
          onClick={() => navigate("/goats/add")}
          className="bg-primary hover:bg-primary/90 text-primary-foreground shadow hover:shadow-md"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Goat
        </Button>
      </div>

      {/* Filters & Search */}
      <div>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, tag ID, or breed..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card border-border focus:border-primary"
            />
          </div>

          {/* Filter Button */}
          <Button
            variant="outline"
            className="border-border hover:border-primary"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          {
            label: "Total",
            value: goats.length,
            color: "bg-primary",
          },
          {
            label: "Healthy",
            value: goats.filter((g) => g.status === "healthy").length,
            color: "bg-green-600",
          },
          {
            label: "Pregnant",
            value: goats.filter((g) => g.status === "pregnant").length,
            color: "bg-blue-600",
          },
          {
            label: "Need Care",
            value: goats.filter((g) => g.status === "sick").length,
            color: "bg-red-600",
          },
        ].map((stat) => (
          <div key={stat.label}>
            <Card className="border-border p-6 bg-card rounded-xl shadow">
              <p className="text-sm font-medium text-muted-foreground mb-1">
                {stat.label}
              </p>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <div className="mt-4 h-1.5 bg-muted rounded-full overflow-hidden">
                <div className={`h-full ${stat.color} w-full`} />
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* Goats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGoats.map((goat) => (
          <GoatCard key={goat.id} goat={goat} onView={handleViewGoat} />
        ))}
      </div>

      {/* Empty State */}
      {filteredGoats.length === 0 && (
        <div className="text-center py-20">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <Search className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">
            No goats found
          </h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </div>
  );
}
