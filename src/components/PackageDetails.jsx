import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaDollarSign, FaRegClock } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { MdEmojiTransportation, MdOutlineTravelExplore } from "react-icons/md";
import { Link, useLoaderData } from "react-router-dom";
import { Autoplay, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
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
    <div className="px-6">
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
      <div className="bg-green-50 p-12 mt-10 flex flex-row items-center justify-between">
        {/* Tour title, type, and others */}
        <div className="space-y-6">
          <h3 className="text-4xl font-bold">{tripTitle}</h3>
          <div className="flex items-center space-x-2">
            <span className="text-green-500 text-3xl">
              <IoLocationOutline />
            </span>
            {tourLocation.map((location, idx) => (
              <p key={idx} className="text-gray-400 text-lg font-semibold">{location},</p>
            ))}
          </div>
        </div>
        <div className="flex flex-row items-center space-x-5">
          <div className="flex flex-row items-center space-x-2">
            <FaDollarSign className="text-4xl text-green-500" />
            <div>
              <p className="text-gray-400">From</p>
              <p className="text-lg font-bold">${price}</p>
            </div>
          </div>
          <div className="flex flex-row items-center space-x-2">
            <FaRegClock className="text-4xl text-green-500" />
            <div>
              <p className="text-gray-400">Duration</p>
              <p className="text-lg font-bold">{duration}</p>
            </div>
          </div>
          <div className="flex flex-row items-center space-x-2">
            <MdOutlineTravelExplore className="text-4xl text-green-500" />
            <div>
              <p className="text-gray-400">Tour Type</p>
              <p className="text-lg font-bold">{tourType}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="my-10 flex justify-between gap-6">
        <div className="w-2/3">
          {/* Photo gallery of tour */}
          <div className="my-10">
            <Swiper
              slidesPerView={2}
              spaceBetween={30}
              freeMode={true}
              modules={[FreeMode, Autoplay]}
              autoplay={{ delay: 1000, disableOnInteraction: false }}
              loop={true}
              className="mySwiper"
            >
              {photoGallery.map((photog, idx) => (
                <SwiperSlide key={idx}>
                  <img src={photog} alt="" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="space-y-4 my-10">
            <h2 className="text-3xl font-bold">Explore Tour</h2>
            <p className="text-gray-500">{overview}</p>

            <div className=" grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-3xl font-bold">Challenges</h3>
                <p className="text-gray-500">{challenges}</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-5">Advanced Facilities</h3>
                {extraFacilities.map((facility, idx) => (
                  <li
                    className="list-none text-gray-500 flex items-center "
                    key={idx}
                  >
                    <FaCircleRight className="mr-4" />
                    {facility}
                  </li>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-bold">Excluded/Included</h3>
              <div className="mt-5 grid md:grid-cols-2 gap-6">
                <div>
                  {included.map((includes, idx) => (
                    <li
                      className="list-none text-gray-400 flex flex-row items-center"
                      key={idx}
                    >
                      <span className="text-green-400 text-xl mr-2">
                        <TiTick />
                      </span>
                      {includes}
                    </li>
                  ))}
                </div>
                <div>
                  {excluded.map((excludes, idx) => (
                    <li
                      className="list-none text-gray-400 flex flex-row items-center"
                      key={idx}
                    >
                      <span className="text-red-500 text-xl mr-2">
                        <RxCross2 />
                      </span>
                      {excludes}
                    </li>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-6">Tour Amenities</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tourAmenities.map((tAmenity, idx) => {
                  const normalizedAmenity = normalizeKey(tAmenity);
                  return (
                    <div
                      key={idx}
                      className="bg-green-50 p-6 flex items-center space-x-4"
                    >
                      <span className="text-3xl text-green-400">
                        {tourAmenityIcons[normalizedAmenity] || "❓"}{" "}
                        {/* Default icon if not found */}
                      </span>
                      <span className="text-gray-400 font-bold">
                        {tAmenity}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            <h2 className="text-3xl font-bold">More Information</h2>
            <div className="flex flex-row items-center space-x-5">
              <div className="flex flex-row items-center space-x-2">
                <BsPeople className="text-4xl text-green-500" />
                <div>
                  <p className="text-gray-400">Max Guests</p>
                  <p className="text-lg font-bold">{groupSize}</p>
                </div>
              </div>
              <div className="flex flex-row items-center space-x-2">
                <CgProfile className="text-4xl text-green-500" />
                <div>
                  <p className="text-gray-400">Min Age</p>
                  <p className="text-lg font-bold">{minAge}</p>
                </div>
              </div>
              <div className="flex flex-row items-center space-x-2">
                <MdEmojiTransportation className="text-4xl text-green-500" />
                <div>
                  <p className="text-gray-400">Transportation </p>
                  <p className="text-lg font-bold">{transportation}</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-bold">Tour plan</h3>
              <div className="mt-6 grid grid-cols-1 gap-6">
                {Object.entries(tourPlans).map(([day, activities], idx) => (
                  <div
                    key={idx}
                    className="collapse collapse-arrow bg-[#4ec479]"
                  >
                    <input type="radio" name="my-accordion-2" defaultChecked />
                    <div className="collapse-title text-xl font-bold text-white">
                      {day}
                    </div>
                    <div className="collapse-content">
                      <p className="text-white">{activities}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="w-1/3 flex flex-col items-center space-y-6">
          {/* Tour Guides */}
          <div className="p-4">
            <h2 className="text-3xl text-black font-semibold">
              Choose Your Guide
            </h2>
            <div className="grid grid-cols-1 gap-4 mt-6">
              {guides.map((guide) => (
                <Link
                  key={guide?._id}
                  to={`/guide-profile/${guide?._id}`}
                  className="flex items-center space-x-4 bg-secondary rounded-xl p-2"
                >
                  <img
                    src={guide?.photo}
                    className="w-12 h-12 rounded-full object-cover"
                    alt=""
                  />
                  <div>
                    <h5 className="text-blackLight font-semibold">
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
          <div className="bg-secondary rounded-xl p-6 w-full max-w-lg mx-auto">
            <h2 className="text-3xl font-semibold text-center text-black  mb-4">
              Book Your Tour
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Package Name */}
              <div className="form-control">
                <label className="label text-white font-semibold">
                  <span className="label-text">Package Name</span>
                </label>
                <input
                  type="text"
                  {...register("tripTitle")}
                  value={tripTitle}
                  readOnly
                  className="input input-bordered border-primary w-full rounded-none"
                />
              </div>

              {/* Tourist Name */}
              <div className="form-control">
                <label className="label text-white font-semibold">
                  <span className="label-text">Tourist Name</span>
                </label>
                <input
                  type="text"
                  {...register("touristName")}
                  defaultValue={user?.displayName}
                  readOnly
                  className="input input-bordered border-primary w-full rounded-none"
                />
              </div>

              {/* Tourist Email */}
              <div className="form-control">
                <label className="label text-white font-semibold">
                  <span className="label-text">Tourist Email</span>
                </label>
                <input
                  type="email"
                  {...register("touristEmail")}
                  defaultValue={user?.email}
                  readOnly
                  className="input input-bordered border-primary w-full rounded-none"
                />
              </div>

              {/* Tourist Image */}
              <div className="form-control">
                <label className="label text-white font-semibold">
                  <span className="label-text">Tourist Image</span>
                </label>
                <input
                  type="url"
                  {...register("touristPhoto")}
                  defaultValue={user?.photoURL}
                  readOnly
                  className="input input-bordered border-primary w-ful rounded-none"
                />
              </div>

              {/* Price */}
              <div className="form-control">
                <label className="label text-white font-semibold">
                  <span className="label-text">Price</span>
                </label>
                <input
                  type="number"
                  {...register("packagePrice")}
                  value={price}
                  readOnly
                  className="input input-bordered border-primary w-full rounded-none"
                />
              </div>

              {/* Tour Date */}
              <div className="form-control">
                <label className="label text-white font-semibold">
                  <span className="label-text">From</span>
                </label>
                <DatePicker
                  selected={tourDate}
                  onChange={(date) => setTourDate(date)}
                  className="input input-bordered space-x-3 border-primary w-full rounded-none"
                  showIcon
                  icon={<FaCalendarAlt className="mt-1 text-xl text-primary" />}
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
                  className="select select-bordered border-primary w-full rounded-none"
                >
                  <option value="">Select a guide</option>
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
                  className="btn rounded-none bg-secondary border-primary text-primary font-semibold hover:bg-primary hover:text-secondary w-full"
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
