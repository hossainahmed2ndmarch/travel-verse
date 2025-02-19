import React from "react";
import { motion } from "framer-motion";
import rio from "../../../assets/rio.jpg";
import cherry from "../../../assets/cherryblossomfestival.webp";
import venice from "../../../assets/carnivalvenice.webp";
import oktober from "../../../assets/oktoberfest.jpg";

const events = [
  {
    id: 1,
    title: "Cherry Blossom Festival",
    date: "March 25 - April 10, 2025",
    location: "Tokyo, Japan",
    image: cherry,
  },
  {
    id: 2,
    title: "Oktoberfest",
    date: "September 21 - October 6, 2025",
    location: "Munich, Germany",
    image: oktober,
  },
  {
    id: 3,
    title: "Carnival of Venice",
    date: "February 15 - March 5, 2025",
    location: "Venice, Italy",
    image: venice,
  },
  {
    id: 4,
    title: "Rio Carnival",
    date: "February 21 - February 29, 2025",
    location: "Rio de Janeiro, Brazil",
    image: rio,
  },
];

const EventFestival = () => {
  return (
    <div className="my-10 pb-10 space-y-10">
      <div className="space-y-6">
        <h2 className="text-4xl font-bold text-center text-primary">
          🎉 Upcoming Events & Festivals
        </h2>
        <p className="text-center">
          Stay updated on the most exciting cultural events and festivals
          worldwide. <br /> Plan your travels around unforgettable celebrations!
          🎉
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {events.map((event) => (
          <motion.div
            key={event.id}
            className="rounded-xl overflow-hidden  transition duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-semibold text-gray-700">
                {event.title}
              </h3>
              <p className="text-gray-500">{event.date}</p>
              <p className="text-green-600 font-medium mt-2">
                {event.location}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EventFestival;
