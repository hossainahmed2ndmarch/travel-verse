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
    <div className="p-6 rounded-2xl bg-white shadow-md hover:shadow-lg transition-shadow">
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
      <h2 className="text-2xl font-bold text-gray-800 mt-4">{title}</h2>

      {/* Content */}
      <p className="text-gray-600 text-sm mt-2">{content}</p>

      {/* Storyteller Info and Actions */}
      <div className="flex items-center justify-between mt-4">
        {/* Storyteller */}
        <div className="flex items-center gap-3">
          <img
            src={storyTellerImage}
            alt={storyTellerName}
            className="w-12 h-12 rounded-full object-cover border border-primary"
          />
          <span className="text-gray-800 font-medium">{storyTellerName}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {/* Edit Button */}
          <button
            onClick={() => setModalOpen(true)}
            className="btn btn-sm bg-blue-500 text-white hover:bg-blue-600 flex items-center gap-1"
          >
            <FaEdit /> Edit
          </button>

          {/* Delete Button */}
          <button
            onClick={() => handleDelete(_id)}
            className="btn btn-sm bg-red-500 text-white hover:bg-red-600 flex items-center gap-1"
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
