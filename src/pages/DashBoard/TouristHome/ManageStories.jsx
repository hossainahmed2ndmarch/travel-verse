import React from "react";
import StoriesCardDashboard from "../../../components/StoriesCardDashboard";
import useStories from "../../../hooks/useStories";

const ManageStories = () => {
  const [storyData, refetch] = useStories();
  console.log(storyData);
  return (
    <div className="min-h-screen py-10 px-4 md:px-16">
      <h2 className="text-4xl font-bold text-center text-primary mb-8">
        Manage Your Story
      </h2>
      <div className="mt-10 grid lg:grid-cols-2 gap-6">
        {Array.isArray(storyData) &&
          storyData?.map((story) => (
            <StoriesCardDashboard
              key={story?._id}
              story={story}
              refetch={refetch}
            ></StoriesCardDashboard>
          ))}
      </div>
    </div>
  );
};

export default ManageStories;
