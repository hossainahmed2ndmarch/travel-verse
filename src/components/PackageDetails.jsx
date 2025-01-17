import React from "react";
import { FaDollarSign, FaRegClock } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineTravelExplore } from "react-icons/md";
import { useLoaderData } from "react-router-dom";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FaCircleRight } from "react-icons/fa6";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";

const PackageDetails = () => {
  const packageData = useLoaderData();
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
  return (
    <div className="px-6">
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
              Explore the breathtaking beauty of [Place Name], where
              unforgettable experiences and mesmerizing landscapes await. Let
              the journey begin!
            </p>
          </div>
        </div>
      </div>

      <div className="bg-green-50 p-12 mt-10 flex flex-row items-center justify-between">
        <div className="space-y-6">
          <h3 className="text-4xl font-bold">{tripTitle}</h3>
          <div className="flex items-center space-x-2">
            <span className="text-green-500 text-3xl">
              <IoLocationOutline />
            </span>
            {tourLocation.map((location, idx) => (
              <p className="text-gray-400 text-lg font-semibold">{location},</p>
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
      <div className="flex items-center justify-between">
        <div className="w-2/3">
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
        
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;
