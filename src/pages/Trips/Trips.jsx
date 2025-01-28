import React, { useState } from "react";
import banner from "../../assets/tourbanner.webp";
import { useLoaderData } from "react-router-dom";
import PackageCard from "../../components/packageCard";
import { Helmet } from "react-helmet-async";

const Trips = () => {
  const [packagesData, setPackagesData] = useState(useLoaderData());
  return (
    <div>
      <Helmet>
        <title>Trips | TravelVerse</title>
      </Helmet>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(${banner})`,
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">
              Explore The World With Our Exclusive Trips
            </h1>
            <p className="mb-5">
              Embark on a journey of discovery with our carefully curated trips.
              Whether you’re seeking thrilling adventures, serene escapes, or
              cultural explorations, our diverse collection of tours is designed
              to offer something for everyone. Start your next adventure with us
              today!
            </p>
          </div>
        </div>
      </div>
      <div className="my-10 grid md:grid-cols-3 gap-6">
        {packagesData.map((item) => (
          <PackageCard key={item?._id} item={item}></PackageCard>
        ))}
      </div>
    </div>
  );
};

export default Trips;
