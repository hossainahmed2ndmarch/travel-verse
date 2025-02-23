import { FaFacebook, FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { ImEarth } from "react-icons/im";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-secondaryBg w-full">
      <footer className="footer bg-secondaryBg place-items-start justify-items-center text-neutral-content p-10">
        <aside>
          <Link to="/" className="btn btn-ghost text-primaryText text-3xl">
            <span>
              <ImEarth />
            </span>
            TravelVerse
          </Link>
          <p className="text-secondaryText">
            TravelVerse Company Ltd.
            <br />
            Providing reliable tech since 1992
          </p>
        </aside>
        <nav>
          <h6 className="footer-title text-primaryText">Company</h6>
          <Link to="/about-us" className="link link-hover text-secondaryText">
            About us
          </Link>
          <Link to="/about-us" className="link link-hover text-secondaryText">
            Contact
          </Link>
          <Link to="/about-us" className="link link-hover text-secondaryText">
            Jobs
          </Link>
          <Link to="/about-us" className="link link-hover text-secondaryText">
            Press kit
          </Link>
        </nav>
        <nav>
          <h6 className="footer-title text-primaryText">Explore</h6>
          <Link to="/" className="link link-hover text-secondaryText">
            Home
          </Link>
          <Link to="/trips" className="link link-hover text-secondaryText">
            Trips
          </Link>
          <Link to="/community" className="link link-hover text-secondaryText">
            Community
          </Link>
        </nav>
        <nav>
          <h6 className="footer-title text-primaryText">Social</h6>
          <div className="grid grid-flow-col gap-4">
            {[
              {
                icon: <FaGithub />,
                url: "https://github.com/hossainahmed2ndmarch",
              },
              {
                icon: <FaFacebook />,
                url: "https://www.facebook.com/89hossain",
              },
              {
                icon: <FaLinkedin />,
                url: "https://www.linkedin.com/in/md-hossain-ahmed-689b03318",
              },
              { icon: <FaWhatsapp />, url: "https://wa.me/+8801792875589" },
            ].map(({ icon, url }, index) => (
              <Link
                key={index}
                className="bg-primaryBg text-primaryText text-2xl p-3 rounded-full shadow-none transition-transform transform hover:scale-110"
                to={url}
                target="_blank"
              >
                {icon}
              </Link>
            ))}
          </div>
        </nav>
      </footer>
      <aside className="footer bg-secondaryBg footer-center text-primaryText p-4">
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by
          TravelVerse Company Ltd.
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
