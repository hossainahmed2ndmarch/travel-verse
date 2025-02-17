import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Link } from "react-router-dom";

import banner1 from "../../assets/banner/banner.webp";
import banner2 from "../../assets/banner/banner1.jpg";
import banner3 from "../../assets/banner/banner2.jpg";
import banner4 from "../../assets/banner/banner3.jpg";

const banners = [
  {
    image: banner1,
    title: "Explore Breathtaking Destinations",
    description:
      "Embark on unforgettable journeys to the world's most stunning locations with expert guidance and seamless planning.",
  },
  {
    image: banner2,
    title: "Your Adventure Starts Here",
    description:
      "Step into a world of adventure, explore new cultures, and create lifelong memories with our curated travel experiences.",
  },
  {
    image: banner3,
    title: "Luxury Meets Nature",
    description:
      "Enjoy the perfect blend of comfort and nature. Discover serene landscapes, luxurious stays, and unique adventures.",
  },
  {
    image: banner4,
    title: "Unleash Your Wanderlust",
    description:
      "From vibrant cityscapes to tranquil retreats, plan your dream trip with ease and explore the world your way.",
  },
];

const Banner = () => {
  return (
    <Swiper
      effect="fade"
      pagination={{ dynamicBullets: true, clickable: true }}
      modules={[Pagination, Autoplay, EffectFade]}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      loop={true}
      className="mySwiper"
    >
      {banners.map((banner, index) => (
        <SwiperSlide
          key={index}
          className="hero min-h-screen"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${banner.image})`,
          }}
        >
          <div className="py-20 mt-10">
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-white text-center">
              <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold">{banner.title}</h1>
                <p className="mb-5">{banner.description}</p>
                <Link
                  to="/trips"
                  className="btn bg-transparent rounded-none border border-light hover:bg-green-400 hover:border-none text-light text-2xl"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Banner;
