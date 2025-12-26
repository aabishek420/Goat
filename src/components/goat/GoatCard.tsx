import { motion } from "framer-motion";
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
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import type { Goat } from "../../types/index";

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
        return "bg-olive/40";
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
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden border-olive/10 hover:border-olive/30 transition-all shadow-sm hover:shadow-xl bg-white/50 backdrop-blur-sm rounded-3xl">
        {/* Image Section */}
        <div className="relative h-52 overflow-hidden bg-linear-to-br from-olive to-forest">
          {goat.photos && goat.photos.length > 0 ? (
            <img
              src={goat.photos[0]}
              alt={goat.name}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg
                width="80"
                height="80"
                viewBox="0 0 80 80"
                fill="currentColor"
                className="text-cream/20"
              >
                <path d="M15 45 Q 22.5 30, 40 37.5 L 43.75 33.75 L 41.875 37.5 Q 50 33.75, 58.75 37.5 L 63.75 26.25 Q 66.25 37.5, 70 37.5 L 73.75 45 L 70 60 L 63.75 63.75 L 56.25 63.75 L 50 60 L 43.75 63.75 L 36.25 63.75 L 28.75 60 Z" />
              </svg>
            </div>
          )}

          {/* Status Badge */}
          <div className="absolute top-4 right-4">
            <Badge
              className={`${getStatusColor(
                goat.status
              )} text-cream border-none px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg`}
            >
              {getStatusLabel(goat.status)}
            </Badge>
          </div>

          {/* Tag ID */}
          <div className="absolute bottom-4 left-4 bg-forest/80 backdrop-blur-md px-3 py-1 rounded-full shadow-lg border border-white/10">
            <p className="text-[10px] text-cream font-bold tracking-widest">
              #{goat.tagId}
            </p>
          </div>

          {/* Favorite Heart */}
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-4 left-4 w-9 h-9 bg-cream/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border border-white/20"
          >
            <Heart className="w-4 h-4 text-red-500" />
          </motion.button>
        </div>

        {/* Content Section */}
        <div className="p-6">
          {/* Name & Breed */}
          <div className="mb-6">
            <h3 className="text-xl font-serif font-bold text-forest mb-1">
              {goat.name}
            </h3>
            <p className="text-xs font-bold text-olive/50 uppercase tracking-widest">
              {goat.breed} • {goat.gender === "male" ? "♂" : "♀"}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-3 p-3 bg-cream/50 rounded-2xl border border-olive/5">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                <Calendar className="w-4 h-4 text-olive" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-olive/40 uppercase tracking-tighter">
                  Age
                </p>
                <p className="text-sm font-bold text-forest">{age}y</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-cream/50 rounded-2xl border border-olive/5">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                <Weight className="w-4 h-4 text-olive" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-olive/40 uppercase tracking-tighter">
                  Weight
                </p>
                <p className="text-sm font-bold text-forest">{goat.weight}kg</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-cream/50 rounded-2xl border border-olive/5">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                <Ruler className="w-4 h-4 text-olive" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-olive/40 uppercase tracking-tighter">
                  Height
                </p>
                <p className="text-sm font-bold text-forest">{goat.height}cm</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-cream/50 rounded-2xl border border-olive/5">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                <MapPin className="w-4 h-4 text-olive" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-olive/40 uppercase tracking-tighter">
                  Location
                </p>
                <p className="text-sm font-bold text-forest">{goat.location}</p>
              </div>
            </div>
          </div>

          {/* Value & Profit */}
          <div className="p-4 bg-linear-to-r from-olive/5 to-gold/5 rounded-2xl mb-6 border border-olive/5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-olive/40 uppercase tracking-widest mb-1">
                  Current Value
                </p>
                <p className="text-xl font-serif font-bold text-forest">
                  ₹{goat.currentValue.toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <div
                  className={`flex items-center gap-1 text-sm font-bold ${
                    Number(profitMargin) >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  <TrendingUp className="w-4 h-4" />
                  {profitMargin}%
                </div>
                <p className="text-[10px] font-bold text-olive/40 uppercase tracking-tighter">
                  profit margin
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              onClick={() => onView(goat)}
              className="flex-1 bg-olive hover:bg-forest text-cream shadow-md hover:shadow-lg rounded-2xl"
            >
              <Eye className="w-4 h-4 mr-2" />
              View Details
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="border-olive/20 hover:bg-cream rounded-2xl w-12 h-12"
            >
              <MoreVertical className="w-4 h-4 text-olive" />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
