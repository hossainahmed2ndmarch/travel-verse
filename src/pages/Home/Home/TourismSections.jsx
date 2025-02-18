import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const TourismSections = () => {
  const [packages, setPackages] = useState([]);
  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    axiosPublic.get("/packages-home").then((res) => {
      setPackages(res?.data);
    });
  }, []);
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
    <div className="container mx-auto space-y-10">
      {/* Section 1: Top Destinations */}
      <section className="space-y-8">
        <h2 className="text-4xl font-bold text-center text-primary">
          Top Destinations
        </h2>
        <p className="text-center">
          Explore breathtaking destinations around the world! From serene
          beaches to bustling <br /> cities, find the perfect place for your
          next adventure.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {packages?.map((destination, index) => (
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
                src={destination?.photo}
                alt={destination?.tourLocation[0]}
                className="h-64 w-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-2xl text-white font-bold">
                  {destination?.tourLocation[0]}
                </h3>
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
        <p className="text-center">
          Hear from fellow travelers! Read authentic reviews and experiences{" "}
          <br />
          to make informed decisions for your next trip.
        </p>
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-6 items-center justify-center"
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            variants={testimonialsVariants}
          >
            {[1, 2, 3, 4].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md w-full"
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
