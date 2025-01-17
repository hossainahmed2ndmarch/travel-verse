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
    _id
  } = item;
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure>
        <img src={photo} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title font-bold text-xl">{tripTitle}</h2>
        <p className="font-bold text-gray-600">{tourType}</p>
        <div className="flex flex-row flex-wrap justify-between items-center">
          <FaLocationDot className="mr-5" />
          {tourLocation.map((location, idx) => (
            <p key={idx}>{location},</p>
          ))}
        </div>
        <p className="flex items-center"><FaDollarSign className="mr-2" />{price}</p>
        <div className="divider"></div>
        <div className="card-actions justify-end">
          <p className="flex items-center space-x-2"><FaClock className="mr-2"></FaClock>{duration}</p>
          <p className="flex items-center space-x-2"><IoIosPeople className="mr-2"/> {groupSize}</p>
          <Link to={`/package-details/${_id}`} className="btn bg-transparent border-none">Explore <FaArrowRightLong /></Link>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
