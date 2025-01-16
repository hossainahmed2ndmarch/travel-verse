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
    <div className="my-10 px-6 grid md:grid-cols-2 gap-6 rounded-2xl">
      <div className="relative">
        <img src={videoThumb} className="rounded-l-2xl" alt="" />
        <button
          onClick={handleModalOpen}
          className="absolute top-1/2 left-1/2 bg-green-500 border-none text-white btn rounded-full "
        >
          <FaPlay />
        </button>
      </div>
      <div className="place-content-center place-items-start">
        <h2 className="text-4xl font-bold mb-5">
          Discover the Beauty of Your Next Destination
        </h2>
        <div className="join join-vertical w-full">
          <div className="collapse collapse-arrow join-item border-base-300 border">
            <input type="radio" name="my-accordion-4" defaultChecked />
            <div className="collapse-title text-xl font-medium">
              What types of tours are available?
            </div>
            <div className="collapse-content">
              <p>
                We offer a wide variety of tours, including adventure trips,
                cultural experiences, sightseeing tours, and family-friendly
                activities. You can filter tours by destination, category, and
                duration to find the perfect match for your needs.
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border-base-300 border">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-xl font-medium">
              How do I find the best tour for me?
            </div>
            <div className="collapse-content">
              <p>
                Our website provides advanced search filters to help you
                discover tours that match your interests, budget, and schedule.
                Each tour comes with detailed descriptions, reviews, and
                itineraries to help you make an informed decision.
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border-base-300 border">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-xl font-medium">
              Can I customize a tour?
            </div>
            <div className="collapse-content">
              <p>
                Yes, many of our tours offer customization options. You can
                adjust activities, duration, or even request private group
                tours. Look for the "Customizable Tour" tag or contact our
                support team for assistance.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Modal */}
      {isOpen && (
        <div className="modal modal-open">
          <div className="modal-box max-w-4xl relative">
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
