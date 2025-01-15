import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const navLinks = (
    <>
      <NavLink
        className="btn rounded-none hover:bg-primary hover:text-light font-semibold bg-transparent border border-secondary"
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        className="btn rounded-none hover:bg-primary hover:text-light font-semibold bg-transparent border border-secondary"
        to="/"
      >
        Trips
      </NavLink>
      <NavLink
        className="btn rounded-none hover:bg-primary hover:text-light font-semibold bg-transparent border border-secondary"
        to="/"
      >
        Community
      </NavLink>
      <NavLink
        className="btn rounded-none hover:bg-primary hover:text-light font-semibold bg-transparent border border-secondary"
        to="/"
      >
        About Us
      </NavLink>
    </>
  );
  return (
    <div className="navbar fixed z-10 border-b border-b-white bg-opacity-30 text-white">
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
          >{navLinks}</ul>
        </div>
        <a className="btn btn-ghost text-xl">TravelVerse</a>
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
                alt="Tailwind CSS Navbar component"
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
