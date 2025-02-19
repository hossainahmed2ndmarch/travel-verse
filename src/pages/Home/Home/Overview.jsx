import React, { useState } from "react";
import ReactPlayer from "react-player";
import videoThumb from "../../../assets/video-thumb.jpg";
import { FaPlay } from "react-icons/fa";

const VideoModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="container mx-auto my-10 grid grid-cols-1 md:grid-cols-2 gap-6 rounded-2xl">
      {/* Video Section */}
      <div className="relative flex justify-center">
        <img src={videoThumb} className="rounded-2xl w-full object-cover" alt="" />
        <button
          onClick={handleModalOpen}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white p-4 sm:p-5 lg:p-6 rounded-full shadow-lg transition hover:bg-green-600"
        >
          <FaPlay className="text-lg sm:text-xl lg:text-2xl" />
        </button>
      </div>

      {/* FAQ Section */}
      <div className="flex flex-col justify-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-10 text-center md:text-left text-primary">
          Discover the Beauty of Your Next Destination
        </h2>
        <div className="join join-vertical w-full">
          <div className="collapse collapse-arrow join-item border border-base-300">
            <input type="radio" name="my-accordion-4" defaultChecked />
            <div className="collapse-title text-lg sm:text-xl font-medium">
              What types of tours are available?
            </div>
            <div className="collapse-content text-sm sm:text-base">
              <p>
                We offer a wide variety of tours, including adventure trips, cultural experiences,
                sightseeing tours, and family-friendly activities.
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border border-base-300">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-lg sm:text-xl font-medium">
              How do I find the best tour for me?
            </div>
            <div className="collapse-content text-sm sm:text-base">
              <p>
                Our website provides search filters to help you find tours that match your
                interests, budget, and schedule.
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border border-base-300">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-lg sm:text-xl font-medium">
              Can I customize a tour?
            </div>
            <div className="collapse-content text-sm sm:text-base">
              <p>
                Yes, many tours offer customization options. You can adjust activities, duration, or
                request private group tours.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="modal-box bg-white max-w-full w-11/12 sm:w-10/12 lg:w-4/5 rounded-lg shadow-lg relative">
            {/* Close Button */}
            <button
              onClick={handleModalClose}
              className="absolute top-2 right-2 btn btn-sm btn-circle"
            >
              ✕
            </button>

            {/* Video Player */}
            <div className="aspect-video w-full">
              <ReactPlayer
                url="https://youtu.be/rDYdeq3JW_E"
                controls
                playing
                width="100%"
                height="100%"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoModal;
