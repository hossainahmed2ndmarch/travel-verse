import React from "react";
import UploadStory from "../../../components/UploadStory";
import useStories from "../../../hooks/useStories";

const AddStories = () => {
 const [refetch] = useStories()
 
  return (
    <div className="min-h-screen py-10 px-4 md:px-16">
      <h2 className="text-4xl font-bold text-center text-primary mb-8">
        Add Your Story
      </h2>
      <UploadStory refetch={refetch}></UploadStory>
    </div>
  );
};

export default AddStories;
