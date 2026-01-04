import {
  Heart,
  TrendingUp,
  MapPin,
  Calendar,
  Weight,
  Ruler,
  Eye,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useMemo } from "react";
import type { Goat } from "@/types";

interface GoatCardProps {
  goat: Goat;
  onView: (goat: Goat) => void;
}

/* ---------------------------------- */
/* Status Config */
/* ---------------------------------- */
const STATUS_MAP: Record<
  string,
  { label: string; color: string }
> = {
  healthy: { label: "Healthy", color: "bg-green-500" },
  sick: { label: "Needs Care", color: "bg-red-500" },
  pregnant: { label: "Pregnant", color: "bg-blue-500" },
  sold: { label: "Sold", color: "bg-gray-500" },
};

export function GoatCard({ goat, onView }: GoatCardProps) {
  const status = STATUS_MAP[goat.status] ?? {
    label: goat.status,
    color: "bg-muted text-muted-foreground",
  };

  const age = useMemo(() => {
    return Math.floor(
      (new Date().getTime() - new Date(goat.birthDate).getTime()) /
        (1000 * 60 * 60 * 24 * 365)
    );
  }, [goat.birthDate]);

  const profitMargin = useMemo(() => {
    return (
      ((goat.currentValue - goat.purchasePrice) / goat.purchasePrice) *
      100
    ).toFixed(1);
  }, [goat.currentValue, goat.purchasePrice]);

  const stats = [
    { label: "Age", value: `${age}y`, icon: Calendar },
    { label: "Weight", value: `${goat.weight}kg`, icon: Weight },
    { label: "Height", value: `${goat.height}cm`, icon: Ruler },
    { label: "Location", value: goat.location, icon: MapPin },
  ];

  return (
    <Card className="group overflow-hidden rounded-xl border-border bg-card shadow-sm transition hover:border-primary/30 hover:shadow-md">
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5">
        {goat.photos?.[0] ? (
          <img
            src={goat.photos[0]}
            alt={goat.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-primary/20">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="currentColor">
              <path d="M12 36 Q 18 24, 32 30 L 35 27 L 33.5 30 Q 40 27, 47 30 L 51 21 Q 53 30, 56 30 L 59 36 L 56 48 L 51 51 L 45 51 L 40 48 L 35 51 L 29 51 L 23 48 Z" />
            </svg>
          </div>
        )}

        <Badge className={`absolute right-3 top-3 ${status.color} px-3 py-1 text-xs font-semibold uppercase text-white`}>
          {status.label}
        </Badge>

        <div className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white">
          #{goat.tagId}
        </div>

        <button className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-md">
          <Heart className="h-4 w-4 text-red-500" />
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-5">
          <h3 className="text-lg font-bold">{goat.name}</h3>
          <p className="text-sm text-muted-foreground">
            {goat.breed} • {goat.gender === "male" ? "♂" : "♀"}
          </p>
        </div>

        <div className="mb-5 grid grid-cols-2 gap-3">
          {stats.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="flex items-center gap-2 rounded-lg bg-muted/20 p-2"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-card">
                <Icon className="h-3.5 w-3.5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-sm font-semibold">{value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-5 rounded-lg bg-gradient-to-r from-primary/5 to-accent/5 p-3">
          <div className="flex justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Current Value</p>
              <p className="text-lg font-bold">
                ₹{goat.currentValue.toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <div
                className={`flex items-center gap-1 text-sm font-semibold ${
                  Number(profitMargin) >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                <TrendingUp className="h-3.5 w-3.5" />
                {profitMargin}%
              </div>
              <p className="text-xs text-muted-foreground">Profit Margin</p>
            </div>
          </div>
        </div>

        <Button
          onClick={() => onView(goat)}
          className="w-full rounded-lg"
        >
          <Eye className="mr-2 h-4 w-4" />
          View Details
        </Button>
      </div>
    </Card>
  );
}
