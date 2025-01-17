import React, { useEffect, useState } from "react";
import { ImEarth } from "react-icons/im";
import { NavLink, useLocation } from "react-router-dom";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
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
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="User Avatar"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
