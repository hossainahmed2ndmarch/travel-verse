import React from "react";
import { FaClock, FaDollarSign } from "react-icons/fa";
import { FaArrowRightLong, FaLocationDot } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";
import { Link } from "react-router-dom";

const PackageCard = ({ item }) => {
  const {
    photo,
    tourType,
    tripTitle,
    duration,
    groupSize,
    price,
    tourLocation,
    _id,
  } = item;
  return (
    <div className="card bg-secondaryBg rounded-xl h-full flex flex-col">
      {/* Image Section */}
      <figure className="h-72">
        <img
          src={photo}
          alt={tripTitle}
          className="w-full h-full object-cover rounded-t-xl"
        />
      </figure>

      {/* Card Body */}
      <div className="card-body flex flex-col flex-grow">
        <h2 className="card-title font-bold text-secondaryText text-xl">{tripTitle}</h2>
        <p className="font-bold text-secondaryText">{tourType}</p>

        {/* Location */}
        <div className="flex flex-wrap items-center space-x-1">
          <FaLocationDot className="text-primaryText text-2xl" />
          {tourLocation.map((location, idx) => (
            <p key={idx} className="text-secondaryText">
              {location}
              {idx < tourLocation.length - 1 ? "," : ""}
            </p>
          ))}
        </div>

        {/* Price */}
        <p className="flex items-center text-secondaryText">
          <FaDollarSign className="text-primaryText text-2xl mr-2" />
          {price}
        </p>
        <div className="flex-grow"></div> 
        <div className="divider"></div>

        {/* Card Footer */}
        <div className="card-actions justify-between items-center mt-auto">
          <p className="flex items-center text-secondaryText">
            <FaClock className="text-primaryText text-2xl mr-2" /> {duration}
          </p>
          <p className="flex items-center text-secondaryText">
            <IoIosPeople className="text-primaryText text-2xl mr-2" /> {groupSize}
          </p>
          <Link
            to={`/package-details/${_id}`}
            className="btn bg-transparent shadow-none border-none text-primaryText flex items-center"
          >
            Explore <FaArrowRightLong className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
