import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, MapPin, Phone, TrendingUp, Heart } from "lucide-react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

export function Marketplace() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Listings", count: 24 },
    { id: "sirohi", label: "Sirohi", count: 8 },
    { id: "beetal", label: "Beetal", count: 6 },
    { id: "jamunapari", label: "Jamunapari", count: 5 },
    { id: "barbari", label: "Barbari", count: 5 },
  ];

  const listings = [
    {
      id: 1,
      goatName: "Premium Sirohi Male",
      breed: "Sirohi",
      age: "2 years",
      weight: "48 kg",
      price: 26000,
      negotiable: true,
      seller: "Ramesh Kumar",
      location: "Rajasthan",
      phone: "+91 98765 43210",
      image:
        "https://images.unsplash.com/photo-1533318087102-b3ad366ed041?w=400",
      featured: true,
      status: "active",
    },
    {
      id: 2,
      goatName: "Beetal Breeding Pair",
      breed: "Beetal",
      age: "3 years",
      weight: "45 kg each",
      price: 52000,
      negotiable: false,
      seller: "Suresh Patel",
      location: "Punjab",
      phone: "+91 98765 43211",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400",
      featured: true,
      status: "active",
    },
    {
      id: 3,
      goatName: "Jamunapari Show Quality",
      breed: "Jamunapari",
      age: "1.5 years",
      weight: "42 kg",
      price: 32000,
      negotiable: true,
      seller: "Mahesh Singh",
      location: "Uttar Pradesh",
      phone: "+91 98765 43212",
      image:
        "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400",
      featured: false,
      status: "active",
    },
    {
      id: 4,
      goatName: "Barbari Young Female",
      breed: "Barbari",
      age: "1 year",
      weight: "32 kg",
      price: 16000,
      negotiable: true,
      seller: "Vijay Sharma",
      location: "Haryana",
      phone: "+91 98765 43213",
      image:
        "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400",
      featured: false,
      status: "active",
    },
    {
      id: 5,
      goatName: "Sirohi Milk Producer",
      breed: "Sirohi",
      age: "2.5 years",
      weight: "44 kg",
      price: 24000,
      negotiable: true,
      seller: "Anil Verma",
      location: "Rajasthan",
      phone: "+91 98765 43214",
      image: "https://images.unsplash.com/photo-1562808756-e0852e5a83b7?w=400",
      featured: false,
      status: "active",
    },
    {
      id: 6,
      goatName: "Beetal High Yield",
      breed: "Beetal",
      age: "3 years",
      weight: "50 kg",
      price: 28000,
      negotiable: false,
      seller: "Rajesh Kumar",
      location: "Punjab",
      phone: "+91 98765 43215",
      image:
        "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400",
      featured: false,
      status: "active",
    },
  ];

  const filteredListings =
    selectedCategory === "all"
      ? listings
      : listings.filter(
          (l) => l.breed.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl text-forest mb-2">Marketplace</h1>
          <p className="text-dust">Buy and sell premium goats</p>
        </div>
        <Button className="bg-gold hover:bg-dust text-forest">
          <ShoppingBag className="w-4 h-4 mr-2" />
          List Your Goat
        </Button>
      </motion.div>

      {/* Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border-dust/20 p-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-xl transition-all ${
                  selectedCategory === category.id
                    ? "bg-olive text-cream shadow-lg"
                    : "bg-cream/50 text-forest hover:bg-cream"
                }`}
              >
                {category.label}
                <span
                  className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                    selectedCategory === category.id
                      ? "bg-gold text-forest"
                      : "bg-dust/30 text-forest"
                  }`}
                >
                  {category.count}
                </span>
              </motion.button>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Featured Listings */}
      {selectedCategory === "all" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-gold" />
            <h2 className="text-xl text-forest">Featured Listings</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {listings
              .filter((l) => l.featured)
              .map((listing, index) => (
                <motion.div
                  key={listing.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="overflow-hidden border-gold/40 shadow-lg hover:shadow-xl transition-all">
                    <div className="flex flex-col md:flex-row">
                      {/* Image */}
                      <div className="relative w-full md:w-48 h-48 bg-gradient-to-br from-dust to-olive">
                        <img
                          src={listing.image}
                          alt={listing.goatName}
                          className="w-full h-full object-cover"
                        />
                        <Badge className="absolute top-3 right-3 bg-gold text-forest border-none">
                          Featured
                        </Badge>
                        <motion.button
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          className="absolute top-3 left-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center"
                        >
                          <Heart className="w-4 h-4 text-red-500" />
                        </motion.button>
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-5">
                        <h3 className="text-lg text-forest mb-2">
                          {listing.goatName}
                        </h3>
                        <p className="text-sm text-dust mb-3">
                          {listing.breed}
                        </p>

                        <div className="grid grid-cols-2 gap-2 mb-4">
                          <div className="text-sm">
                            <span className="text-dust">Age:</span>
                            <span className="text-forest ml-1">
                              {listing.age}
                            </span>
                          </div>
                          <div className="text-sm">
                            <span className="text-dust">Weight:</span>
                            <span className="text-forest ml-1">
                              {listing.weight}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mb-3 text-sm text-dust">
                          <MapPin className="w-4 h-4" />
                          {listing.location}
                        </div>

                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-dust/20">
                          <div>
                            <p className="text-2xl text-forest">
                              ₹{listing.price.toLocaleString()}
                            </p>
                            {listing.negotiable && (
                              <p className="text-xs text-dust">Negotiable</p>
                            )}
                          </div>
                          <Button className="bg-olive hover:bg-forest text-white">
                            <Phone className="w-4 h-4 mr-2" />
                            Contact
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
          </div>
        </motion.div>
      )}

      {/* All Listings Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-xl text-forest mb-4">
          {selectedCategory === "all"
            ? "All Listings"
            : `${
                selectedCategory.charAt(0).toUpperCase() +
                selectedCategory.slice(1)
              } Listings`}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing, index) => (
            <motion.div
              key={listing.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="overflow-hidden border-dust/20 hover:border-olive/40 transition-all shadow-lg hover:shadow-xl">
                {/* Image */}
                <div className="relative h-48 bg-gradient-to-br from-dust to-olive">
                  <img
                    src={listing.image}
                    alt={listing.goatName}
                    className="w-full h-full object-cover"
                  />
                  {listing.featured && (
                    <Badge className="absolute top-3 right-3 bg-gold text-forest border-none">
                      Featured
                    </Badge>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-3 left-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center"
                  >
                    <Heart className="w-4 h-4 text-red-500" />
                  </motion.button>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-forest mb-1">{listing.goatName}</h3>
                  <p className="text-sm text-dust mb-3">{listing.breed}</p>

                  <div className="space-y-1 mb-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-dust">Age:</span>
                      <span className="text-forest">{listing.age}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-dust">Weight:</span>
                      <span className="text-forest">{listing.weight}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3 text-sm text-dust">
                    <MapPin className="w-3 h-3" />
                    {listing.location}
                  </div>

                  <div className="pt-3 border-t border-dust/20">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-xl text-forest">
                          ₹{listing.price.toLocaleString()}
                        </p>
                        {listing.negotiable && (
                          <p className="text-xs text-dust">Negotiable</p>
                        )}
                      </div>
                    </div>
                    <Button className="w-full bg-olive hover:bg-forest text-white">
                      <Phone className="w-4 h-4 mr-2" />
                      Contact Seller
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
