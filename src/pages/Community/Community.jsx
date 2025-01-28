import React, { useState } from "react";
import banner from "../../assets/tourbanner.webp";
import { useLoaderData } from "react-router-dom";
import StoriesCard from "../../components/StoriesCard";
import { Helmet } from "react-helmet-async";

const Community = () => {
  const [stories, setStories] = useState(useLoaderData());
  return (
    <div>
      <Helmet>
        <title>Community | TravelVerse</title>
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
            <h1 className="mb-5 text-5xl font-bold">Our Vibrant Community</h1>
            <p className="mb-5">
              Join a thriving network of storytellers, adventurers, and
              dreamers! Explore inspiring stories, share your journey, and
              connect with like-minded individuals. Together, we build a
              community where every voice matters, and every story finds its
              place.
            </p>
          </div>
        </div>
      </div>
      <div className="my-10 grid md:grid-cols-2 gap-6">
        {stories.map((story) => (
          <StoriesCard key={story?._id} story={story}></StoriesCard>
        ))}
      </div>
    </div>
  );
};

export default Community;
