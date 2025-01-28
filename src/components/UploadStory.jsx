import { useForm } from "react-hook-form";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";
import { useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
const cloudName = import.meta.env.VITE_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_PRESET;

const UploadStory = ({ refetch }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [previewImages, setPreviewImages] = useState([]);
  const queryClient = useQueryClient();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure()
  const { user } = useAuth();
  const [userData] = useUser();

  // Generate image previews
  const handleImagePreview = (event) => {
    const files = Array.from(event.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  const handleFormSubmit = async (data) => {
    try {
      // Prepare image upload promises
      const imageFiles = Array.from(data.images);
      // console.log(imageFiles);
      const uploadPromises = imageFiles.map((file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);
        return axiosPublic.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          formData
        );
      });

      // Wait for all images to upload
      const uploadResponses = await Promise.all(uploadPromises);
      // console.log(uploadResponses);
      const uploadedImages = uploadResponses.map((res) => res.data.secure_url);
      // console.log(uploadedImages);
      const storyData = {
        storyTeller: userData.email,
        storyTellerName: userData.name,
        storyTellerImage: userData.photo,
        title: data.title,
        content: data.content,
        images: uploadedImages,
      };
      // console.log(storyData);
      await axiosSecure.post("/stories", storyData).then((res) => {
        // console.log(res.data);
        if (res.data.insertedId) {
          reset();
          queryClient.invalidateQueries({ queryKey: ["user", user?.email] });
          // refetch();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Story Added Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    } catch (error) {
      // console.log(error);
      Swal.fire({
        icon: "error",
        title: "Failed to submit the story",
        text: "An error occurred while submitting your story.",
      });
    }
  };
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Title */}
      <div className="form-control">
        <label className="label">
          <span className="label-text text-xl text-black font-semibold">
            Title
          </span>
        </label>
        <input
          type="text"
          {...register("title", { required: "Title is required" })}
          className="input input-bordered w-full md:w-auto rounded-none border border-primary"
          placeholder="Enter a title for your story"
        />
        {errors.title && (
          <span className="text-red-500 text-sm mt-1">
            {errors.title.message}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="form-control">
        <label className="label">
          <span className="label-text text-xl text-black font-semibold">
            Story Content
          </span>
        </label>
        <textarea
          {...register("content", { required: "Content is required" })}
          className="textarea textarea-bordered w-full md:w-auto rounded-none border border-primary"
          rows="6"
          placeholder="Write your story here..."
        ></textarea>
        {errors.content && (
          <span className="text-red-500 text-sm mt-1">
            {errors.content.message}
          </span>
        )}
      </div>

      {/* Image Upload */}
      <div className="form-control">
        <label className="label">
          <span className="label-text text-xl text-black font-semibold">
            Upload Images
          </span>
        </label>
        <input
          type="file"
          {...register("images", {
            required: "Please upload at least one image",
          })}
          multiple
          accept="image/*"
          className="file-input file-input-bordered w-full md:w-auto rounded-none border border-primary"
          onChange={handleImagePreview}
        />
        {errors.images && (
          <span className="text-red-500 text-sm mt-1">
            {errors.images.message}
          </span>
        )}
      </div>

      {/* Image Previews */}
      {previewImages.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {previewImages.map((src, index) => (
            <img
              key={index}
              src={src}
              alt="Preview"
              className="h-24 w-24 object-cover rounded-md shadow-sm"
            />
          ))}
        </div>
      )}

      {/* Submit Button */}
      <div className="form-control">
        <button
          type="submit"
          className="btn border-none bg-primary text-light rounded-none hover:text-primary font-bold w-full"
        >
          Submit Story
        </button>
      </div>
    </form>
  );
};

export default UploadStory;
