import {
  Heart,
  TrendingUp,
  MapPin,
  Calendar,
  Weight,
  Ruler,
  Eye,
  MoreVertical,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Goat } from "@/types/index";

interface GoatCardProps {
  goat: Goat;
  onView: (goat: Goat) => void;
}

export function GoatCard({ goat, onView }: GoatCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-500";
      case "sick":
        return "bg-red-500";
      case "pregnant":
        return "bg-blue-500";
      case "sold":
        return "bg-gray-500";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "healthy":
        return "Healthy";
      case "sick":
        return "Needs Care";
      case "pregnant":
        return "Pregnant";
      case "sold":
        return "Sold";
      default:
        return status;
    }
  };

  const age = Math.floor(
    (new Date().getTime() - new Date(goat.birthDate).getTime()) /
      (1000 * 60 * 60 * 24 * 365)
  );

  const profitMargin = (
    ((goat.currentValue - goat.purchasePrice) / goat.purchasePrice) *
    100
  ).toFixed(1);

  return (
    <Card className="overflow-hidden border-border hover:border-primary/30 transition-all shadow-sm hover:shadow-md bg-card rounded-xl group">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5">
        {goat.photos && goat.photos.length > 0 ? (
          <img
            src={goat.photos[0]}
            alt={goat.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="currentColor"
              className="text-primary/20"
            >
              <path d="M12 36 Q 18 24, 32 30 L 35 27 L 33.5 30 Q 40 27, 47 30 L 51 21 Q 53 30, 56 30 L 59 36 L 56 48 L 51 51 L 45 51 L 40 48 L 35 51 L 29 51 L 23 48 Z" />
            </svg>
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <Badge
            className={`${getStatusColor(
              goat.status
            )} text-white border-none px-3 py-1 rounded-full text-xs font-semibold uppercase`}
          >
            {getStatusLabel(goat.status)}
          </Badge>
        </div>

        {/* Tag ID */}
        <div className="absolute bottom-3 left-3 bg-black/60 px-3 py-1 rounded-full">
          <p className="text-xs text-white font-semibold">#{goat.tagId}</p>
        </div>

        {/* Favorite Heart */}
        <button className="absolute top-3 left-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-md">
          <Heart className="w-4 h-4 text-red-500" />
        </button>
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Name & Breed */}
        <div className="mb-5">
          <h3 className="text-lg font-bold text-foreground mb-1">{goat.name}</h3>
          <p className="text-sm text-muted-foreground font-medium">
            {goat.breed} • {goat.gender === "male" ? "♂" : "♀"}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="flex items-center gap-2 p-2 bg-muted/20 rounded-lg">
            <div className="w-7 h-7 rounded-md bg-card flex items-center justify-center">
              <Calendar className="w-3.5 h-3.5 text-primary" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">Age</p>
              <p className="text-sm font-semibold text-foreground">{age}y</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 bg-muted/20 rounded-lg">
            <div className="w-7 h-7 rounded-md bg-card flex items-center justify-center">
              <Weight className="w-3.5 h-3.5 text-primary" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">Weight</p>
              <p className="text-sm font-semibold text-foreground">
                {goat.weight}kg
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 bg-muted/20 rounded-lg">
            <div className="w-7 h-7 rounded-md bg-card flex items-center justify-center">
              <Ruler className="w-3.5 h-3.5 text-primary" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">Height</p>
              <p className="text-sm font-semibold text-foreground">
                {goat.height}cm
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 bg-muted/20 rounded-lg">
            <div className="w-7 h-7 rounded-md bg-card flex items-center justify-center">
              <MapPin className="w-3.5 h-3.5 text-primary" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">
                Location
              </p>
              <p className="text-sm font-semibold text-foreground">
                {goat.location}
              </p>
            </div>
          </div>
        </div>

        {/* Value & Profit */}
        <div className="p-3 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg mb-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">
                Current Value
              </p>
              <p className="text-lg font-bold text-foreground">
                ₹{goat.currentValue.toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <div
                className={`flex items-center gap-1 text-sm font-semibold ${
                  Number(profitMargin) >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                {profitMargin}%
              </div>
              <p className="text-xs text-muted-foreground">Profit Margin</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            onClick={() => onView(goat)}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg"
          >
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-lg w-10 h-10"
          >
            <MoreVertical className="w-4 h-4 text-muted-foreground" />
          </Button>
        </div>
      </div>
    </Card>
  );
}