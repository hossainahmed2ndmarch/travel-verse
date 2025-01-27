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
    <div className="p-6 rounded-2xl bg-white shadow-md hover:shadow-lg transition-shadow">
      {/* Images Grid */}
      <div className="grid grid-cols-2 gap-2 rounded-t-2xl overflow-hidden">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Story Image ${index + 1}`}
            className="w-full h-32 object-cover rounded-lg"
          />
        ))}
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-800 mt-4">{title}</h2>

      {/* Content */}
      <p className="text-gray-600 text-sm mt-2">{content}</p>

      {/* Storyteller Info and Share Button */}
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

        {/* Share Button */}
        <div onClick={handleShare}>
          {user ? (
            <FacebookShareButton
              url={window.location.href} // Current page URL
              quote={`${title} - ${content}`}
              hashtag="#TravelStories"
              className="flex items-center gap-2"
            >
              <FaFacebook className="text-blue-600" size={24} />
              <span className="text-gray-700">Share</span>
            </FacebookShareButton>
          ) : (
            <button className="flex items-center gap-2 text-gray-700">
              <FaFacebook className="text-blue-600" size={24} />
              <span>Share</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoriesCard;
