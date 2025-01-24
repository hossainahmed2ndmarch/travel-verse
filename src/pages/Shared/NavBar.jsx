import React, { useEffect, useState } from "react";
import { ImEarth } from "react-icons/im";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import userIcon from "../../assets/user.png";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logOut } = useAuth();

  const navigate = useNavigate();

  // Log out
  const handleLogOut = () => {
    toast.info("🚪 You have successfully logged out. See you soon!", {
      icon: "👋",
    });
    navigate("/");
    logOut(navigate);
  };
  // const location = useLocation();

  // Scroll listener to detect scroll
  useEffect(() => {
    const handleScroll = () => {
      // Check if the user scrolled down 50px
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  // const isPackageDetailsPage = location.pathname.includes("/package-details");
  const navLinks = (
    <>
      {["/", "/trips", "/community", "/about-us"].map((path, index) => {
        const labels = ["Home", "Trips", "Community", "About Us"];
        return (
          <NavLink
            key={index}
            to={path}
            className={({ isActive }) =>
              `btn border-none bg-transparent text-lg font-bold transition-all ${
                isActive
                  ? isScrolled
                    ? "text-slate-800"
                    : "text-green-400"
                  : isScrolled
                  ? "text-slate-200"
                  : "text-white"
              }`
            }
          >
            {labels[index]}
          </NavLink>
        );
      })}
    </>
  );
  // const navLinksAuth = (
  //   <>
  //     {[ "/login", "/register"].map((path, index) => {
  //       const labels = ["Login", "SignUp"];
  //       return (
  //         <NavLink
  //           key={index}
  //           to={path}
  //           className={({ isActive }) =>
  //             `btn border-none bg-transparent text-lg font-bold transition-all ${
  //               isActive
  //                 ? isScrolled
  //                   ? "text-slate-800"
  //                   : "text-green-400"
  //                 : isScrolled
  //                 ? "text-slate-200"
  //                 : "text-white"
  //             }`
  //           }
  //         >
  //           {labels[index]}
  //         </NavLink>
  //       );
  //     })}
  //   </>
  // );

  return (
    <div
      className={`navbar fixed z-10 border-b border-b-slate-500 text-white transition-all duration-300 ${
        isScrolled ? "bg-green-600 bg-opacity-90 shadow-lg" : "bg-opacity-30"
      }`}
    >
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navLinks}
          </ul>
        </div>
        <a className="btn btn-ghost text-3xl">
          <span className="text-green-400">
            <ImEarth />
          </span>
          TravelVerse
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>
      <div className="navbar-end flex items-center space-x-4">
        {user && user?.email ? (
          <button
            onClick={handleLogOut}
            className="btn border-none bg-transparent text-lg text-white font-bold transition-all"
          >
            LogOut
          </button>
        ) : (
          <NavLink
            to="/login"
            className="btn border-none bg-transparent text-lg text-white font-bold transition-all"
          >
            LogIn
          </NavLink>
        )}

        {user && user?.email ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              data-tooltip-id="profile-tooltip"
              data-tooltip-content={`Logged in as ${
                user?.displayName || "User"
              }`}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="User Avatar" src={user?.photoURL || userIcon} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3  p-4 shadow text-black"
            >
              {/* User Display Name */}
              <li
                className="ml-2 overflow-hidden text-ellipsis whitespace-nowrap max-w-full"
                title={user?.displayName}
              >
                {user?.displayName}
              </li>
              {/* User Email */}
              <li
                className="ml-2 overflow-hidden text-ellipsis whitespace-nowrap max-w-full"
                title={user?.email}
              >
                {user?.email}
              </li>
              {/* Other Menu Items */}
              <li>
                <NavLink to='/dashBoard/myBookings'>Dashboard</NavLink>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        ) : (
          <NavLink
            to="/register"
            className="btn border-none bg-transparent text-lg text-white font-bold transition-all"
          >
            SignUp
          </NavLink>
        )}
      </div>
      <Tooltip id="profile-tooltip" place="bottom" />
      <Tooltip id="register-tooltip" place="bottom" />
      <Tooltip id="logout-tooltip" place="bottom" />
      <Tooltip id="login-tooltip" place="bottom" />
    </div>
  );
};

export default NavBar;
