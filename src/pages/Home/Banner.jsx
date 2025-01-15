import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import banner1 from "../../assets/banner/banner.webp";
import banner2 from "../../assets/banner/banner1.jpg";
import banner3 from "../../assets/banner/banner2.jpg";
import banner4 from "../../assets/banner/banner3.jpg";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <>
      <Swiper
        pagination={{
          dynamicBullets: true,
          clickable: true,
        }}
        modules={[Pagination, Autoplay]}
        autoplay={{ delay: 10000, disableOnInteraction: false }}
        loop={true}
        className="mySwiper"
      >
        <SwiperSlide
          className="hero min-h-screen"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${banner1})`,
          }}
        >
          <div className="py-20">
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-white text-center">
              <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold">
                  Discover Luxurious Living
                </h1>
                <p className="mb-5">
                  Step into a world of refined elegance where every detail is
                  designed to provide unmatched comfort. Our premium residences
                  redefine modern living with sophisticated interiors, serene
                  surroundings, and state-of-the-art facilities.
                </p>
                <Link
                  // to="/all-rooms"
                  className="btn bg-transparent rounded-none border border-light hover:bg-secondary hover:border-none text-light text-2xl"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide
          className="hero min-h-screen"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${banner2})`,
          }}
        >
          <div className="py-20">
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-white text-center">
              <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold">
                  Discover Luxurious Living
                </h1>
                <p className="mb-5">
                  Step into a world of refined elegance where every detail is
                  designed to provide unmatched comfort. Our premium residences
                  redefine modern living with sophisticated interiors, serene
                  surroundings, and state-of-the-art facilities.
                </p>
                <Link
                  // to="/all-rooms"
                  className="btn bg-transparent rounded-none border border-light hover:bg-secondary hover:border-none text-light text-2xl"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide
          className="hero min-h-screen"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${banner3})`,
          }}
        >
          <div className="py-20">
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-white text-center">
              <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold">
                  Discover Luxurious Living
                </h1>
                <p className="mb-5">
                  Step into a world of refined elegance where every detail is
                  designed to provide unmatched comfort. Our premium residences
                  redefine modern living with sophisticated interiors, serene
                  surroundings, and state-of-the-art facilities.
                </p>
                <Link
                  // to="/all-rooms"
                  className="btn bg-transparent rounded-none border border-light hover:bg-secondary hover:border-none text-light text-2xl"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide
          className="hero min-h-screen"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${banner4})`,
          }}
        >
          <div className="py-20">
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-white text-center">
              <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold">
                  Discover Luxurious Living
                </h1>
                <p className="mb-5">
                  Step into a world of refined elegance where every detail is
                  designed to provide unmatched comfort. Our premium residences
                  redefine modern living with sophisticated interiors, serene
                  surroundings, and state-of-the-art facilities.
                </p>
                <Link
                  // to="/all-rooms"
                  className="btn bg-transparent rounded-none border border-light hover:bg-secondary hover:border-none text-light text-2xl"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Banner;
