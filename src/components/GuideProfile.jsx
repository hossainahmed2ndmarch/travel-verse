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
    <div className="px-6">
      {/* Header Section */}
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(${photo})`,
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="absolute bottom-8 left-12 right-0">
          <h1 className="text-3xl font-bold text-white">{name}</h1>
        </div>
      </div>

      {/* Details Section */}
      <div className="p-6">
        <h2 className="text-3xl font-semibold mb-4">Guide Information</h2>

        {/* Contact Section */}
        <div className="md:flex items-center justify-between gap-4 mb-6">
          <div className="space-y-5">
            <h3 className="text-xl flex items-center space-x-4 font-bold ">
              <span>
                <IoIosContact className="text-4xl text-primary" />
              </span>
              Contact{" "}
            </h3>
            <div className="flex items-center space-x-4">
              <Link
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-500 text-2xl hover:opacity-75"
              >
                <FaWhatsapp />
              </Link>
              <Link
                href={facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-2xl hover:opacity-75"
              >
                <FaFacebook />
              </Link>
            </div>
            <p className="text-gray-600 flex items-center space-x-4">
              <span>
                <MdOutlineMail className="text-2xl text-primary" />
              </span>
              <strong>Email:</strong> {email}
            </p>
          </div>
          {/* Ratings and Reviews */}
          <div className="flex items-center space-x-4 mb-6">
            <Rating
              style={{ maxWidth: 150 }}
              value={ratings}
              readOnly
              stars={5}
              step={0.5}
            />
            <p className="text-gray-600 text-sm">
              ({ratings} from {reviews} reviews)
            </p>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mb-6">
          <h3 className="text-lg font-medium">Experience:</h3>
          <p className="text-gray-700">{experience}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-medium">Languages:</h3>
          <ul className="list-disc pl-6 text-gray-700">
            {languageSkill.map((lang, index) => (
              <li key={index}>{lang}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-medium">Extra Skills:</h3>
          <ul className="list-disc pl-6 text-gray-700">
            {extraSkill.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GuideProfile;
