import React from "react";

const TravelDeals = () => {
  const deals = [
    {
      destination: "Bali, Indonesia",
      image: "https://source.unsplash.com/400x300/?bali,beach",
      discount: "30% OFF",
      price: "$799",
      duration: "7 Days / 6 Nights",
    },
    {
      destination: "Paris, France",
      image: "https://source.unsplash.com/400x300/?paris,eiffel-tower",
      discount: "25% OFF",
      price: "$999",
      duration: "5 Days / 4 Nights",
    },
    {
      destination: "Tokyo, Japan",
      image: "https://source.unsplash.com/400x300/?tokyo,city",
      discount: "20% OFF",
      price: "$899",
      duration: "6 Days / 5 Nights",
    },
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
          ✨ Travel Deals & Discounts ✨
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Grab exclusive travel deals and save big on your next adventure! 🌍✈️
        </p>
        
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
          {deals.map((deal, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300">
              <div className="relative">
                <img src={deal.image} alt={deal.destination} className="w-full h-56 object-cover rounded-t-xl" />
                <span className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-md text-sm font-bold">
                  {deal.discount}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800">{deal.destination}</h3>
                <p className="text-gray-600 text-sm">{deal.duration}</p>
                <div className="flex justify-between items-center mt-3">
                  <p className="text-lg font-bold text-green-500">{deal.price}</p>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TravelDeals;
