import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useState } from "react";
import EditStory from "./EditStory";

const StoriesCardDashboard = ({ story, refetch }) => {
  const { storyTellerName, images, content, title, storyTellerImage, _id } =
    story;
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);

  // Delete Functionality
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete story!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/stories/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Story has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div className="p-5 rounded-xl bg-secondaryBg">
      {/* Images Grid */}
      <div className="grid grid-cols-2 gap-2 rounded-t-2xl overflow-hidden">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <img
              src={image}
              alt={`Story Image ${index + 1}`}
              className="w-full h-32 object-cover rounded-lg"
            />
          </div>
        ))}
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-secondaryText mt-4">{title}</h2>

      {/* Content */}
      <p className="text-secondaryText text-sm mt-2 min-h-[120px] overflow-hidden line-clamp-3">{content}</p>

      {/* Storyteller Info and Actions */}
      <div className="flex items-center justify-between mt-4">
        {/* Storyteller */}
        <div className="flex items-center gap-3">
          <img
            src={storyTellerImage}
            alt={storyTellerName}
            className="w-12 h-12 rounded-full object-cover border border-primaryText"
          />
          <span className="text-secondaryText font-medium">{storyTellerName}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {/* Edit Button */}
          <button
            onClick={() => setModalOpen(true)}
            className="btn btn-sm bg-primaryText text-secondaryText hover:bg-primaryText border-none flex items-center gap-1"

          >
            <FaEdit /> Edit
          </button>

          {/* Delete Button */}
          <button
            onClick={() => handleDelete(_id)}
            className="btn btn-sm bg-red-500 text-secondaryText hover:bg-red-600 border-none flex items-center gap-1"
          >
            <FaTrashAlt /> Delete
          </button>
        </div>
      </div>
      {isModalOpen && (
        <EditStory
          setModalOpen={setModalOpen}
          isModalOpen={isModalOpen}
          story={story}
          refetch={refetch}
        ></EditStory>
      )}
    </div>
  );
};

export default StoriesCardDashboard;
