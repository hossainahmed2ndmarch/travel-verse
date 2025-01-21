import React from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import CountUp from "react-countup";
import { Link } from "react-router-dom";

const GuidesCard = ({ item }) => {
  const { name, photo, ratings, experience, reviews, _id } = item;
  return (
    <div className="card card-side bg-base-100 shadow-xl">
      <figure className="w-1/2">
        <img className="w-full h-full object-cover" src={photo} alt="Movie" />
      </figure>
      <div className="card-body w-1/2">
        <Rating
          style={{ maxWidth: 120 }}
          value={ratings}
          readOnly
          stars={5}
          step={0.5}
          size={24}
        />
        <h2 className="card-title">{name}</h2>
        <p>
          <strong>Experience:</strong> {experience}
        </p>

        <div className="card-actions justify-between items-center mt-4">
          <p className="p-2 bg-secondary rounded-md flex flex-col items-center space-y-2">
            Reviews
            <CountUp
              start={0}
              end={reviews}
              duration={2.5}
              separator=","
              className="text-2xl font-extrabold text-navyText"
            />
          </p>
          <Link
            to={`/guide-profile/${_id}`}
            className="btn bg-secondary border-none hover:text-primary"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GuidesCard;
