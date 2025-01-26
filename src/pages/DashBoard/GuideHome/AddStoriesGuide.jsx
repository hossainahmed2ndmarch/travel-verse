import React from "react";
import UploadStory from "../../../components/UploadStory";

const AddStoriesGuide = () => {
  return (
    <div className="min-h-screen py-10 px-4 md:px-16">
      <h2 className="text-4xl font-bold text-center text-primary mb-8">
        Add Your Story
      </h2>
      <UploadStory></UploadStory>
    </div>
  );
};

export default AddStoriesGuide;
