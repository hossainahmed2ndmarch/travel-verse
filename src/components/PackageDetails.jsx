import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaDollarSign, FaRegClock } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { MdEmojiTransportation, MdOutlineTravelExplore } from "react-icons/md";
import { Link, useLoaderData } from "react-router-dom";
import { Autoplay, FreeMode, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { FaCircleRight } from "react-icons/fa6";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { CgProfile } from "react-icons/cg";
import { BsPeople } from "react-icons/bs";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

const PackageDetails = () => {
  const packageData = useLoaderData();
  const { user } = useAuth();
  const [guides, setGuides] = useState([]);
  const axiosSecure = useAxiosSecure();
  const [tourDate, setTourDate] = useState(new Date());
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    axios.get("https://travel-verse-server.vercel.app/guides").then((res) => {
      setGuides(res?.data);
    });
  }, []);
  const {
    _id,
    photo,
    photoGallery,
    tourType,
    tripTitle,
    price,
    duration,
    groupSize,
    minAge,
    included,
    excluded,
    tourAmenities,
    transportation,
    tourPlans,
    overview,
    challenges,
    extraFacilities,
    tourLocation,
  } = packageData;

  // Map icons for room amenities
  const tourAmenityIcons = {
    islandHopping: "🌴",
    archaeologicalTours: "🏺",
    beachResorts: "🏖️",
    scenicCruises: "🚢",
    mountainRailways: "🚞",
    skiing: "🎿",
    highSpeedTrains: "🚄",
    traditionalTeaCeremonies: "🍵",
    cherryBlossoms: "🌸",
    culturalShows: "🎭",
    hotAirBalloonRides: "🎈",
    historicLandmarks: "🏰",
    cityTours: "🏙️",
    traditionalBalineseCuisine: "🍛",
    beachActivities: "🏄",
    templeVisits: "⛩️",
    luxuryAccommodations: "🏨",
    snorkeling: "🤿",
    privateBeachAccess: "🌊",
    localCuisine: "🍲",
    scenicBoatRides: "🛶",
    localCraftsMarket: "🛍️",
    stoneCollectionPoints: "🪨",
    teaGardenVisits: "🍃",
    seaActivities: "🌊",
    firstAid: "🩹",
    wildlifeSpotting: "🦓",
    guidedTours: "🗺️",
    bonfire: "🔥",
    culturalTours: "🎎",
    beachGames: "🏐",
    campfire: "🔥",
    trekkingRoutes: "🥾",
    tribalMarketTours: "🛍️",
    fishing: "🎣",
    boating: "🚤",
    culturalInsights: "📚",
    wifi: "📶",
    natureWalks: "🌳",
    historicalTours: "🏛️",
    localFood: "🍴",
    birdWatching: "🦜",
  };
  const normalizeKey = (str) =>
    str
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, " ") // Remove special characters
      .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) =>
        index === 0 ? match.toLowerCase() : match.toUpperCase()
      )
      .replace(/\s+/g, "");

  const onSubmit = (data) => {
    const selectedGuide = JSON.parse(data.selectedGuide);
    const { selectedGuide: _, ...otherData } = data;

    const bookingData = {
      ...otherData,
      guideEmail: selectedGuide.guideEmail,
      bookedPackage: _id,
      guideName: selectedGuide.guideName,
      tourDate: tourDate.toISOString(),
      status: "pending",
    };
    axiosSecure.post("/bookings", bookingData).then((res) => {
      if (res.data?.insertedId) {
        Swal.fire({
          title: "Booking Successful!",
          html: `Your booking has been successfully submitted.<br><a href="/dashBoard/myBookings" class="text-blue-600 font-semibold underline">View My Bookings</a>`,
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    });
  };
  return (
    <div className="px-6 bg-secondaryBg">
      {/* Tour cover image */}
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(${photo})`,
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">
              Discover Your Next Adventure
            </h1>
            <p className="mb-5">
              Explore the breathtaking beauty of{" "}
              <span className="text-green-400"> {tripTitle}</span>, where
              unforgettable experiences and mesmerizing landscapes await. Let
              the journey begin!
            </p>
          </div>
        </div>
      </div>
      {/* Main body with package details */}
      <div className="bg-primaryBg p-12 mt-10 flex flex-col md:flex-row md:items-center justify-between space-y-10 md:space-y-0">
        {/* Tour title, type, and others */}
        <div className="space-y-6 w-full md:w-2/3">
          <h3 className="text-3xl md:text-4xl font-bold text-primaryText">
            {tripTitle}
          </h3>
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-3">
            <span className="text-primaryText text-3xl">
              <IoLocationOutline />
            </span>
            {tourLocation.map((location, idx) => (
              <p key={idx} className="text-secondaryText text-lg font-semibold">
                {location}
              </p>
            ))}
          </div>
        </div>

        {/* Price, Duration, and Tour Type */}
        <div className="flex flex-col md:flex-row md:items-center space-y-6 md:space-y-0 gap-6 w-full md:w-1/3">
          {/* Price */}
          <div className="flex flex-row  items-center space-x-3">
            <FaDollarSign className="text-3xl text-primaryText" />
            <div>
              <p className="text-secondaryText">From</p>
              <p className="text-xl font-bold text-primaryText">${price}</p>
            </div>
          </div>

          {/* Duration */}
          <div className="flex flex-row items-center space-x-3">
            <FaRegClock className="text-3xl text-primaryText" />
            <div>
              <p className="text-secondaryText">Duration</p>
              <p className="text-xl font-bold text-primaryText">{duration}</p>
            </div>
          </div>

          {/* Tour Type */}
          <div className="flex flex-row items-center space-x-3">
            <MdOutlineTravelExplore className="text-3xl text-primaryText" />
            <div>
              <p className="text-secondaryText">Tour Type</p>
              <p className="text-xl font-bold text-primaryText">{tourType}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="my-10 md:flex justify-between gap-6">
        <div className="w-full md:w-2/3">
          {/* Photo gallery of tour */}
          <div className="my-10">
            <Swiper
              effect="fade"
              slidesPerView={1}
              spaceBetween={20}
              freeMode={true}
              modules={[FreeMode, Autoplay, EffectFade]}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              loop={true}
              className="mySwiper"
            >
              {photoGallery.map((photog, idx) => (
                <SwiperSlide key={idx} className="h-full">
                  <img
                    className="h-32 w-full object-cover md:h-72"
                    src={photog}
                    alt=""
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="space-y-4 my-10">
            <h2 className="text-3xl font-bold text-primaryText">
              Explore Tour
            </h2>
            <p className="text-secondaryText">{overview}</p>

            <div className=" grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-3xl font-bold text-primaryText">
                  Challenges
                </h3>
                <p className="text-secondaryText">{challenges}</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-5 text-primaryText">
                  Advanced Facilities
                </h3>
                {extraFacilities.map((facility, idx) => (
                  <li
                    className="list-none text-secondaryText flex items-center "
                    key={idx}
                  >
                    <FaCircleRight className="mr-4 text-primaryText" />
                    {facility}
                  </li>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-primaryText">
                Excluded/Included
              </h3>
              <div className="mt-5 grid md:grid-cols-2 gap-6">
                <div>
                  {included.map((includes, idx) => (
                    <li
                      className="list-none text-secondaryText flex flex-row items-center"
                      key={idx}
                    >
                      <span className="text-primaryText text-xl mr-2">
                        <TiTick />
                      </span>
                      {includes}
                    </li>
                  ))}
                </div>
                <div>
                  {excluded.map((excludes, idx) => (
                    <li
                      className="list-none text-secondaryText flex flex-row items-center"
                      key={idx}
                    >
                      <span className="text-primaryText text-xl mr-2">
                        <RxCross2 />
                      </span>
                      {excludes}
                    </li>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-6 text-primaryText">
                Tour Amenities
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tourAmenities.map((tAmenity, idx) => {
                  const normalizedAmenity = normalizeKey(tAmenity);
                  return (
                    <div
                      key={idx}
                      className="bg-primaryBg p-6 flex items-center space-x-4"
                    >
                      <span className="text-3xl text-green-400">
                        {tourAmenityIcons[normalizedAmenity] || "❓"}{" "}
                      </span>
                      <span className="text-secondaryText font-bold">
                        {tAmenity}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            <h2 className="text-3xl font-bold text-primaryText">
              More Information
            </h2>
            <div className="flex flex-col md:flex-row md:items-center sm:space-y-5 md:space-x-5">
              <div className="flex mflex-row items-center space-x-2">
                <BsPeople className="text-4xl text-primaryText" />
                <div>
                  <p className="text-secondaryText">Max Guests</p>
                  <p className="text-lg font-bold text-primaryText">
                    {groupSize}
                  </p>
                </div>
              </div>
              <div className="flex flex-row items-center space-x-2">
                <CgProfile className="text-4xl text-primaryText" />
                <div>
                  <p className="text-secondaryText">Min Age</p>
                  <p className="text-lg font-bold text-primaryText">{minAge}</p>
                </div>
              </div>
              <div className="flex flex-row items-center space-x-2">
                <MdEmojiTransportation className="text-4xl text-primaryText" />
                <div>
                  <p className="text-secondaryText">Transportation </p>
                  <p className="text-lg font-bold text-primaryText">
                    {transportation}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-primaryText">Tour plan</h3>
              <div className="mt-6 grid grid-cols-1 gap-6">
                {Object.entries(tourPlans).map(([day, activities], idx) => (
                  <div
                    key={idx}
                    className="collapse collapse-arrow border border-primaryText bg-primaryBg"
                  >
                    <input type="radio" name="my-accordion-2" defaultChecked />
                    <div className="collapse-title text-xl font-bold text-secondaryText">
                      {day}
                    </div>
                    <div className="collapse-content">
                      <p className="text-secondaryText">{activities}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/3 flex flex-col items-center space-y-6">
          {/* Tour Guides */}
          <div className="md:p-4">
            <h2 className="text-3xl text-primaryText font-semibold">
              Choose Your Guide
            </h2>
            <div className="grid grid-cols-1 gap-4 mt-6">
              {guides.map((guide) => (
                <Link
                  key={guide?._id}
                  to={`/guide-profile/${guide?._id}`}
                  className="flex items-center space-x-4 bg-primaryBg rounded-xl p-2"
                >
                  <img
                    src={guide?.photo}
                    className="w-12 h-12 rounded-full object-cover"
                    alt=""
                  />
                  <div>
                    <h5 className="text-secondaryText font-semibold">
                      {guide?.name}
                    </h5>
                    <Rating
                      style={{ maxWidth: 120 }}
                      value={guide?.ratings}
                      readOnly
                      stars={5}
                      step={0.5}
                      size={24}
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
          {/* Booking Tour Form */}
          <div className="bg-primaryBg rounded-xl p-6 w-full max-w-lg mx-auto">
            <h2 className="text-3xl font-semibold text-center text-primaryText mb-4">
              Book Your Tour
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Package Name */}
              <div className="form-control">
                <label className="label font-semibold">
                  <span className="label-text text-secondaryText">
                    Package Name
                  </span>
                </label>
                <input
                  type="text"
                  {...register("tripTitle")}
                  value={tripTitle}
                  readOnly
                  className="input border-primaryText w-full rounded-none bg-secondaryBg"
                />
              </div>

              {/* Tourist Name */}
              <div className="form-control">
                <label className="label text-white font-semibold">
                  <span className="label-text text-secondaryText">
                    Tourist Name
                  </span>
                </label>
                <input
                  type="text"
                  {...register("touristName")}
                  defaultValue={user?.displayName}
                  readOnly
                  className="input border-primaryText w-full rounded-none bg-secondaryBg"
                />
              </div>

              {/* Tourist Email */}
              <div className="form-control">
                <label className="label text-white font-semibold">
                  <span className="label-text text-secondaryText">
                    Tourist Email
                  </span>
                </label>
                <input
                  type="email"
                  {...register("touristEmail")}
                  defaultValue={user?.email}
                  readOnly
                  className="input border-primaryText w-full rounded-none bg-secondaryBg"
                />
              </div>

              {/* Tourist Image */}
              <div className="form-control">
                <label className="label text-white font-semibold">
                  <span className="label-text text-secondaryText">
                    Tourist Image
                  </span>
                </label>
                <input
                  type="url"
                  {...register("touristPhoto")}
                  defaultValue={user?.photoURL}
                  readOnly
                  className="input border-primaryText w-full rounded-none bg-secondaryBg"
                />
              </div>

              {/* Price */}
              <div className="form-control">
                <label className="label text-white font-semibold">
                  <span className="label-text text-secondaryText">Price</span>
                </label>
                <input
                  type="number"
                  {...register("packagePrice")}
                  value={price}
                  readOnly
                  className="input border-primaryText w-full rounded-none bg-secondaryBg"
                />
              </div>

              {/* Tour Date */}
              <div className="form-control">
                <label className="label text-white font-semibold">
                  <span className="label-text text-secondaryText">From</span>
                </label>
                <DatePicker
                  selected={tourDate}
                  onChange={(date) => setTourDate(date)}
                  className="input border-primaryText w-full rounded-none bg-secondaryBg"
                  showIcon
                  icon={
                    <FaCalendarAlt className="mt-1 text-xl text-[#22c55e]" />
                  }
                  minDate={new Date()}
                  dateFormat="MMMM d, yyyy"
                />
              </div>

              {/* Tour Guide */}
              <div className="form-control">
                <label className="label text-white font-semibold">
                  <span className="label-text">Tour Guide</span>
                </label>
                <select
                  {...register("selectedGuide", {
                    required: "Please select a guide.",
                  })}
                  className="select border-primaryText w-full rounded-none bg-secondaryBg"
                >
                  <option value="" className="border border-primaryText">
                    Select a guide
                  </option>
                  {guides.map((guide) => (
                    <option
                      key={guide?._id}
                      value={JSON.stringify({
                        guideEmail: guide?.email,
                        guideName: guide?.name,
                      })}
                    >
                      {guide?.name}
                    </option>
                  ))}
                </select>
                {errors.selectedGuide && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.selectedGuide.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="form-control mt-4">
                <button
                  type="submit"
                  className="btn rounded-none bg-transparent border-primaryText text-primaryText font-semibold  hover:text-primaryText hover:bg-transparent hover:border-primaryText w-full"
                  disabled={!user}
                >
                  Book Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;
