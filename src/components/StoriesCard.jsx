import { FacebookShareButton, FacebookIcon } from "react-share";
import { useNavigate } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import useAuth from "../hooks/useAuth";

const StoriesCard = ({ story }) => {
  const { storyTellerName, images, content, title, storyTellerImage } = story;
  const { user } = useAuth(); // Get the logged-in user context
  const navigate = useNavigate();

  const handleShare = () => {
    if (!user) {
      navigate("/login"); // Redirect to login if the user is not logged in
    }
  };

  return (
    <div className="p-5 bg-white min-h-[400px] flex flex-col justify-between">
      {/* Images Grid */}
      <div className="grid grid-cols-2 gap-2 rounded-lg overflow-hidden">
        {images.slice(0, 2).map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Story Image ${index + 1}`}
            className="w-full h-40 object-cover rounded-lg"
          />
        ))}
      </div>

      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-800 mt-4">{title}</h2>

      {/* Content */}
      <p className="text-gray-600 text-sm mt-2 min-h-[120px] overflow-hidden line-clamp-3">
        {content}
      </p>

      {/* Storyteller Info and Share Button */}
      <div className="flex items-center justify-between mt-4">
        {/* Storyteller */}
        <div className="flex items-center gap-3">
          <img
            src={storyTellerImage}
            alt={storyTellerName}
            className="w-12 h-12 rounded-full object-cover border border-gray-300 shadow-sm"
          />
          <span className="text-gray-800 font-medium">{storyTellerName}</span>
        </div>

        {/* Share Button */}
        <div onClick={handleShare} className="cursor-pointer">
          {user ? (
            <FacebookShareButton
              url={window.location.href} // Current page URL
              quote={`${title} - ${content}`}
              hashtag="#TravelStories"
              className="flex items-center gap-2 bg-blue-100 px-3 py-1 rounded-full hover:bg-blue-200 transition"
            >
              <FaFacebook className="text-blue-600" size={20} />
              <span className="text-gray-700 text-sm font-medium">Share</span>
            </FacebookShareButton>
          ) : (
            <button className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200 transition">
              <FaFacebook className="text-blue-600" size={20} />
              <span className="text-gray-700 text-sm font-medium">Share</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoriesCard;
