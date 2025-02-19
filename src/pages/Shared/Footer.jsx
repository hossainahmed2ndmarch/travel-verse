import { FaFacebook, FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { ImEarth } from "react-icons/im";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-base-200 w-full">
      <footer className="footer place-items-start justify-items-center bg-neutral text-neutral-content p-10">
        <aside>
          <Link to="/" className="btn btn-ghost text-3xl">
            <span className="text-green-400">
              <ImEarth />
            </span>
            TravelVerse
          </Link>
          <p>
            TravelVerse Company Ltd.
            <br />
            Providing reliable tech since 1992
          </p>
        </aside>
        <nav>
          <h6 className="footer-title text-primary">Company</h6>
          <Link to="/about-us" className="link link-hover">
            About us
          </Link>
          <Link to="/about-us" className="link link-hover">
            Contact
          </Link>
          <Link to="/about-us" className="link link-hover">
            Jobs
          </Link>
          <Link to="/about-us" className="link link-hover">
            Press kit
          </Link>
        </nav>
        <nav>
          <h6 className="footer-title text-primary">Explore</h6>
          <Link to='/' className="link link-hover">Home</Link>
          <Link to='/trips' className="link link-hover">Trips</Link>
          <Link to='/community' className="link link-hover">Community</Link>
          
          
        </nav>
        <nav>
          <h6 className="footer-title text-primary">Social</h6>
          <div className="grid grid-flow-col gap-4">
          {[
            {
              icon: <FaGithub />,
              url: "https://github.com/hossainahmed2ndmarch",
            },
            { icon: <FaFacebook />, url: "https://www.facebook.com/89hossain" },
            {
              icon: <FaLinkedin />,
              url: "https://www.linkedin.com/in/md-hossain-ahmed-689b03318",
            },
            { icon: <FaWhatsapp />, url: "https://wa.me/+8801792875589" },
          ].map(({ icon, url }, index) => (
            <Link
              key={index}
              className="bg-white text-primary text-2xl p-3 rounded-full shadow-lg transition-transform transform hover:scale-110"
              to={url}
              target="_blank"
            >
              {icon}
            </Link>
          ))}
          </div>
        </nav>
      </footer>
      <aside className="footer bg-neutral footer-center text-primary p-4">
        <p >
          Copyright © {new Date().getFullYear()} - All right reserved by TravelVerse Company Ltd.
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
