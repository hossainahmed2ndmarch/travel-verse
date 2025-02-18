import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import Select from "react-select"; // Import react-select
import useAxiosPublic from "../../hooks/useAxiosPublic";
import banner from "../../assets/tourbanner.webp";
import PackageCard from "../../components/packageCard";

const Trips = () => {
  const axiosPublic = useAxiosPublic();
  const [sortOrder, setSortOrder] = useState("asc"); // Default: Low to High

  // Fetch Packages Data
  const {
    data: packages = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["packages", sortOrder],
    queryFn: async () => {
      const res = await axiosPublic.get("/packages", { params: { sortOrder } });
      return res.data;
    },
    keepPreviousData: true,
  });

  // Sorting Options for React Select
  const sortingOptions = [
    { value: "asc", label: "Price: Low to High" },
    { value: "desc", label: "Price: High to Low" },
  ];

  // Handle Sorting Change
  const handleSortChange = (selectedOption) => {
    setSortOrder(selectedOption.value);
    refetch();
  };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: "white",
      borderColor: "#10B981", // Primary focus color
      boxShadow: state.isFocused ? "0 0 0 2px rgba(16, 185, 129, 0.5)" : "none",
      "&:hover": {
        borderColor: "#10B981",
      },
      padding: "5px",
    }),
    option: (base, { isFocused, isSelected }) => ({
      ...base,
      backgroundColor: isSelected ? "#10B981" : isFocused ? "#D1FAE5" : "white",
      color: isSelected ? "white" : "#374151",
      cursor: "pointer",
      "&:active": {
        backgroundColor: "#10B981",
      },
    }),
    menu: (base) => ({
      ...base,
      borderRadius: "8px",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      zIndex: 20,
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: "#10B981", // Change color of the icon
      padding: "6px",
      "&:hover": {
        color: "#047857", // Darker green on hover
      },
    }),
  };

  return (
    <div className="px-6">
      <Helmet>
        <title>Trips | TravelVerse</title>
      </Helmet>

      {/* Hero Banner */}
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

      {/* Sorting Select Dropdown */}
      <div className="flex justify-center my-6">
        <div className="w-64">
          <Select
            options={sortingOptions}
            defaultValue={sortingOptions[0]}
            onChange={handleSortChange}
            styles={customStyles} // Apply custom styles
            className="text-black"
          />
        </div>
      </div>

      {/* Package Cards */}
      <div className="my-10 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-items-center gap-6">
        {isLoading ? (<isLoading></isLoading>
        ) : (
          packages.map((item) => <PackageCard key={item._id} item={item} />)
        )}
      </div>
    </div>
  );
};

export default Trips;
