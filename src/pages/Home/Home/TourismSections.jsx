import React from "react";
import { motion } from "framer-motion";

const TourismSections = () => {
  // Animation Variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const testimonialsVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="container mx-auto space-y-16 px-4 md:px-8">
      {/* Section 1: Top Destinations */}
      <section className="space-y-8">
        <h2 className="text-4xl font-bold text-center text-primary">
          Top Destinations
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {["Paris", "Maldives", "Tokyo"].map((destination, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden bg-white shadow-lg rounded-lg cursor-pointer"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <img
                src={`https://source.unsplash.com/400x300/?${destination}`}
                alt={destination}
                className="h-64 w-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-2xl text-white font-bold">{destination}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Section 2: Customer Experiences */}
      <section className="space-y-8">
        <h2 className="text-4xl font-bold text-center text-primary">
          Customer Experiences
        </h2>
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-6"
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            variants={testimonialsVariants}
          >
            {[1, 2, 3].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md w-80"
              >
                <p className="text-gray-700 italic">
                  "It was a breathtaking experience! From the beautiful
                  landscapes to the friendly guides, everything was perfect."
                </p>
                <div className="mt-4 flex items-center space-x-4">
                  <img
                    src={`https://i.pravatar.cc/100?img=${index + 10}`}
                    alt="Customer"
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-lg font-bold">Customer {index + 1}</p>
                    <p className="text-sm text-gray-500">Traveler</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TourismSections;
