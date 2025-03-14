import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import StoriesCard from "../../../components/StoriesCard";
import { Link } from "react-router-dom";
import { FaArrowRightLong, FaLocationDot } from "react-icons/fa6";

const Stories = () => {
  const [stories, setStories] = useState([]);
  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    axiosPublic.get("/stories-home").then((res) => {
      setStories(res?.data);
    });
  }, []);
  return (
    <div className="my-10">
      <div className="space-y-6">
        <h2 className="text-4xl text-center text-primaryText font-bold">
          Journey Chronicles: Tales from Around the World
        </h2>
        <p className="text-center text-secondaryText">
          Discover captivating stories and experiences from travelers around the
          world. <br />
          Explore their journeys, adventures, and cherished memories.
        </p>
      </div>

      <div className="mt-10 grid md:grid-cols-2 gap-6">
        {stories.map((story) => (
          <StoriesCard key={story?._id} story={story}></StoriesCard>
        ))}
      </div>
      <Link
        to="/community"
        className="btn border-none bg-transparent shadow-none text-primaryText rounded-none hover:bg-secondaryBg hover:text-primaryText mt-10 flex items-center"
      >
        Explore All Stories <FaArrowRightLong className="ml-2" />
      </Link>
    </div>
  );
};

export default Stories;
