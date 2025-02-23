import bali from "../../../assets/bali.webp";
import paris from "../../../assets/paris.jpeg";
import tokyo from "../../../assets/japan.jpg";
import newzealand from "../../../assets/newzealand.webp";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

const Offer = () => {
  const deals = [
    {
      destination: "Bali, Indonesia",
      image: bali,
      discount: "30% OFF",
      price: "$799",
      duration: "7 Days / 6 Nights",
    },
    {
      destination: "Paris, France",
      image: paris,
      discount: "25% OFF",
      price: "$999",
      duration: "5 Days / 4 Nights",
    },
    {
      destination: "Tokyo, Japan",
      image: tokyo,
      discount: "20% OFF",
      price: "$899",
      duration: "6 Days / 5 Nights",
    },
    {
      destination: "Newzealand",
      image: newzealand,
      discount: "20% OFF",
      price: "$899",
      duration: "6 Days / 5 Nights",
    },
  ];

  return (
    <section className="my-10">
      <div className="mx-auto space-y-10">
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-center text-primaryText">
            ✨ Travel Deals & Discounts ✨
          </h2>
          <p className="text-center text-secondaryText">
            Grab exclusive travel deals and save big on your next adventure!
            🌍✈️
          </p>
        </div>

        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-8">
          {deals.map((deal, index) => (
            <div
              key={index}
              className="rounded-xl transition duration-300 bg-secondaryBg"
            >
              <div className="relative">
                <img
                  src={deal.image}
                  alt={deal.destination}
                  className="w-full h-56 object-cover rounded-t-xl"
                />
                <span className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-md text-sm font-bold">
                  {deal.discount}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold text-secondaryText">
                  {deal.destination}
                </h3>
                <p className="text-secondaryText text-sm">{deal.duration}</p>
                <div className="flex justify-between items-center mt-5">
                  <p className="text-lg font-bold text-primaryText">
                    {deal.price}
                  </p>
                  <Link to="/trips">
                    <button className="btn border-none bg-transparent text-secondaryText rounded-lg hover:text-secondaryText shadow-none hover:bg-primaryBg transition-colors">
                      Book Now <FaArrowRightLong className="ml-2" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Offer;
