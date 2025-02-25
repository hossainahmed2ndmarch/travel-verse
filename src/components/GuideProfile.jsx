import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import { FaFacebook, FaWhatsapp } from "react-icons/fa";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { IoIosContact } from "react-icons/io";
import { MdOutlineMail } from "react-icons/md";

const GuideProfile = () => {
  const guideData = useLoaderData();
  const {
    name,
    photo,
    email,
    whatsapp,
    facebook,
    languageSkill,
    experience,
    ratings,
    reviews,
    extraSkill,
  } = guideData;

  return (
    <div className="px-6 bg-primaryBg  pb-10">
      {/* Header Section */}
      <div
        className="relative min-h-screen bg-cover bg-center flex items-center justify-center text-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${photo})`,
        }}
      >
        <h1 className="text-4xl font-bold text-white drop-shadow-lg">{name}</h1>
      </div>

      {/* Guide Info Section */}
      <div className="bg-secondaryBg rounded-lg p-6 mt-6">
        <h2 className="text-3xl font-semibold text-primaryText border-b-2 pb-2 mb-6">
          Guide Information
        </h2>

        {/* Contact and Ratings Section */}
        <div className="md:flex justify-between items-center mb-6">
          <div className="space-y-5">
            <h3 className="text-xl flex items-center space-x-4 font-bold text-primaryText">
              <IoIosContact className="text-3xl" />
              <span>Contact</span>
            </h3>
            <div className="flex space-x-6">
              <Link
                to={`https://wa.me/${whatsapp}`}
                target="_blank"
                className="text-primaryText text-2xl hover:text-green-700 transition-all"
              >
                <FaWhatsapp />
              </Link>
              <Link
                to={facebook}
                target="_blank"
                className="text-blue-600 text-2xl hover:text-blue-800 transition-all"
              >
                <FaFacebook />
              </Link>
            </div>
            <p className="text-gray-600 flex items-center space-x-2 text-secondaryText">
              <MdOutlineMail className="text-2xl text-primaryText" />
              <span className="font-medium text-secondaryText">
                Email:
              </span>{" "}
              {email}
            </p>
          </div>

          {/* Ratings */}
          <div className="flex flex-col items-center md:items-end mt-6 md:mt-0">
            <Rating
              style={{ maxWidth: 180 }}
              value={ratings}
              readOnly
              stars={5}
              step={0.5}
            />
            <p className="text-secondaryText text-sm mt-2">
              ({ratings} from {reviews} reviews)
            </p>
          </div>
        </div>

        {/* Guide Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-bold text-primaryText">Experience:</h3>
            <p className="text-secondaryText">{experience}</p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-primaryText">Languages:</h3>
            <ul className="list-disc pl-6 text-secondaryText">
              {languageSkill.map((lang, index) => (
                <li key={index}>{lang}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-primaryText">
              Extra Skills:
            </h3>
            <ul className="list-disc pl-6 text-secondaryText">
              {extraSkill.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideProfile;
