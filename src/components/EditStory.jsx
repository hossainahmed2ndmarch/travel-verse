import React, { useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const cloudName = import.meta.env.VITE_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_PRESET;

const EditStory = ({ setModalOpen, story, refetch }) => {
  const { images, title, content, _id } = story;
  const [updatedImages, setUpdatedImages] = useState(images);
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  const handleRemoveImage = async (image) => {
    try {
      setLoading(true);
      const response = await axiosSecure.patch(`/stories/${_id}`, {
        pullImage: image, // Pass the image to remove as `pullImage`
      });
      if (response.data.success) {
        setUpdatedImages((prev) => prev.filter((img) => img !== image));
        Swal.fire({
          title: "Image Removed!",
          text: "The image has been successfully removed from the story.",
          icon: "success",
        });
        refetch();
      } else {
        throw new Error("Failed to remove image");
      }
    } catch (error) {
      console.error("Error removing image:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to remove the image. Please try again.",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddImage = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      Swal.fire({
        title: "Error!",
        text: "Please select a valid image file.",
        icon: "error",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      setLoading(true);

      // Upload to Cloudinary
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (data.secure_url) {
        // Update the story with the new image URL
        const response = await axiosSecure.patch(`/stories/${_id}`, {
          pushImage: data.secure_url, // Pass the new image URL as `pushImage`
        });

        if (response.data.success) {
          setUpdatedImages((prev) => [...prev, data.secure_url]);
          Swal.fire({
            title: "Image Uploaded!",
            text: "The image has been successfully uploaded and added to the story.",
            icon: "success",
          });
          refetch();
        } else {
          throw new Error("Failed to add image");
        }
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to upload the image to Cloudinary.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to upload the image. Please try again.",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveChanges = () => {
    setModalOpen(false);
    Swal.fire({
      title: "Changes Saved!",
      text: "Your story has been successfully updated.",
      icon: "success",
    });
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box relative">
        <button
          onClick={() => setModalOpen(false)}
          className="btn btn-sm btn-circle absolute right-2 top-2"
        >
          ✕
        </button>
        <h3 className="font-bold text-2xl mb-4 text-center text-primary">
          Edit Your Story
        </h3>

        {/* Display Existing Images */}
        <div className="grid grid-cols-2 gap-4">
          {updatedImages.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image}
                alt={`Story Image ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
              <button
                onClick={() => handleRemoveImage(image)}
                disabled={loading}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Add New Image */}
        <div className="mt-6">
          <h4 className="font-medium text-lg mb-2">Upload New Image</h4>
          <div className="flex items-center gap-2">
            <input
              type="file"
              accept="image/*"
              onChange={handleAddImage}
              className="file-input file-input-bordered w-full"
            />
          </div>
        </div>

        {/* Save Changes */}
        <div className="mt-6 text-center">
          <button
            onClick={handleSaveChanges}
            className="btn btn-success w-full"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditStory;
