import React from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import CountUp from "react-countup";
import { Link } from "react-router-dom";

const GuidesCard = ({ item }) => {
  const { name, photo, ratings, experience, reviews, _id } = item;
  return (
    <div className="card card-side bg-secondaryBg rounded-xl overflow-hidden flex items-center">
      {/* Image Section */}
      <figure className="w-1/2 h-64">
        <img className="w-full h-full object-cover" src={photo} alt={name} />
      </figure>

      {/* Card Content */}
      <div className="card-body w-1/2 p-6 flex flex-col justify-between">
        {/* Ratings */}
        <div className="flex items-center space-x-2">
          <Rating
            style={{ maxWidth: 120 }}
            value={ratings}
            readOnly
            stars={5}
            step={0.5}
            size={24}
          />
          <span className="text-secondaryText text-sm">{ratings}</span>
        </div>

        {/* Title */}
        <h2 className="card-title text-2xl font-bold text-secondaryText">{name}</h2>

        {/* Experience */}
        <p className="text-secondaryText">
          <strong className="text-secondaryText">Experience:</strong> {experience}
        </p>

        {/* Actions Section */}
        <div className="flex justify-between items-center mt-4">
          {/* Reviews Count */}
          <div className="p-3 bg-primaryBg text-primaryText rounded-lg shadow-sm text-center">
            <p className="text-sm font-semibold">Reviews</p>
            <CountUp
              start={0}
              end={reviews}
              duration={2.5}
              separator=","
              className="text-2xl font-extrabold"
            />
          </div>

          {/* Details Button */}
          <Link
            to={`/guide-profile/${_id}`}
            className="btn bg-green-500 hover:bg-green-600 text-secondaryText font-semibold px-6 py-2 rounded-lg transition-all duration-300"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GuidesCard;
