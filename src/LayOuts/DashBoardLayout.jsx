import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import Footer from "../pages/Shared/Footer";
import { ImEarth, ImProfile } from "react-icons/im";
import { CgProfile } from "react-icons/cg";
import { TbBrandBooking } from "react-icons/tb";
import { SiStorybook } from "react-icons/si";
import { VscGitStashApply } from "react-icons/vsc";
import { IoHomeOutline, IoStatsChartOutline } from "react-icons/io5";
import { MdOutlineHistoryEdu, MdOutlineTravelExplore } from "react-icons/md";
import { GrGroup } from "react-icons/gr";
import useBooking from "../hooks/useBooking";
import { FaUsersGear } from "react-icons/fa6";
import { LuPackagePlus } from "react-icons/lu";
import useAdmin from "../hooks/useAdmin";
import useGuide from "../hooks/useGuide";
import { BsJournalPlus } from "react-icons/bs";
import useUser from "../hooks/useUser";
import { Helmet } from "react-helmet-async";
import { GiHamburgerMenu } from "react-icons/gi";

const DashBoardLayout = () => {
  const [bookings] = useBooking();
  // const [userData]=useUser()
  const [isAdmin] = useAdmin();
  const [isGuide] = useGuide();

  return (
    <div className="drawer lg:drawer-open">
      <Helmet>
        <title>Dashboard | TravelVerse</title>
      </Helmet>

      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content  bg-secondary flex flex-col items-center">
        <div className="navbar fixed left-0 bg-base-100">
          <div className="flex-1">
            <label
              htmlFor="my-drawer-2"
              className="btn bg-transparent border-none rounded-none shadow-none lg:hidden"
            >
              <GiHamburgerMenu className="text-2xl text-green-600" />
            </label>
          </div>
          <div className="flex-none">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <div className="indicator">
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
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="badge badge-sm indicator-item">8</span>
                </div>
              </div>
              <div
                tabIndex={0}
                className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
              >
                <div className="card-body">
                  <span className="text-lg font-bold">8 Items</span>
                  <span className="text-info">Subtotal: $999</span>
                  <div className="card-actions">
                    <button className="btn btn-primary btn-block">
                      View cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
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
        <Outlet></Outlet>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <ul className="menu bg-primary text-base-content min-h-full w-80 p-4">
          <Link
            to="/"
            className="btn btn-ghost text-3xl font-bold text-light mb-10"
          >
            <span>
              <ImEarth />
            </span>
            TravelVerse
          </Link>
          {isAdmin ? (
            <>
              <NavLink
                to="/dashBoard/adminOverview"
                className="btn justify-start border-none bg-transparent text-lg font-bold"
              >
                <IoStatsChartOutline className="text-2xl" />
                OverView
              </NavLink>
              <NavLink
                to="/dashBoard/adminProfile"
                className="btn justify-start border-none bg-transparent text-lg font-bold"
              >
                <CgProfile className="text-2xl" />
                My Profile
              </NavLink>
              <NavLink
                to="/dashBoard/allUsers"
                className="btn justify-start border-none bg-transparent text-lg font-bold"
              >
                <FaUsersGear className="text-2xl" />
                Manage Users
              </NavLink>
              <NavLink
                to="/dashBoard/addPackages"
                className="btn justify-start border-none bg-transparent text-lg font-bold"
              >
                <LuPackagePlus className="text-2xl" />
                Add Packages
              </NavLink>
              <NavLink
                to="/dashBoard/manageCandidates"
                className="btn justify-start border-none bg-transparent text-lg font-bold"
              >
                <ImProfile className="text-2xl" />
                Recruit Guides
              </NavLink>
            </>
          ) : isGuide ? (
            <>
              <NavLink
                to="/dashBoard/guideOverview"
                className="btn justify-start border-none bg-transparent text-lg font-bold"
              >
                <IoStatsChartOutline className="text-2xl" />
                OverView
              </NavLink>
              <NavLink
                to="/dashBoard/guideProfile"
                className="btn justify-start border-none bg-transparent text-lg font-bold"
              >
                <CgProfile className="text-2xl" />
                My Profile
              </NavLink>
              <NavLink
                to="/dashBoard/guideTours"
                className="btn justify-start border-none bg-transparent text-lg font-bold"
              >
                <MdOutlineTravelExplore className="text-2xl" />
                My Assigned Tours
              </NavLink>
              <NavLink
                to="/dashBoard/guideStories"
                className="btn justify-start border-none bg-transparent text-lg font-bold"
              >
                <MdOutlineHistoryEdu className="text-2xl" />
                My Stories
              </NavLink>
              <NavLink
                to="/dashBoard/guideAddStories"
                className="btn justify-start border-none bg-transparent text-lg font-bold"
              >
                <BsJournalPlus className="text-2xl" />
                Add Stories
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/dashBoard/touristOverview"
                className="btn justify-start border-none bg-transparent text-lg font-bold"
              >
                <IoStatsChartOutline className="text-2xl" />
                OverView
              </NavLink>
              <NavLink
                to="/dashBoard/myProfile"
                className="btn justify-start border-none bg-transparent text-lg font-bold"
              >
                <CgProfile className="text-2xl" />
                My Profile
              </NavLink>
              <NavLink
                to="/dashBoard/myBookings"
                className="btn justify-start border-none bg-transparent text-lg font-bold"
              >
                <TbBrandBooking className="text-2xl" />
                My Bookings({bookings?.length})
              </NavLink>
              <NavLink
                to="/dashBoard/myStories"
                className="btn justify-start border-none bg-transparent text-lg font-bold"
              >
                <MdOutlineHistoryEdu className="text-2xl" />
                My Stories
              </NavLink>
              <NavLink
                to="/dashBoard/addStories"
                className="btn justify-start border-none bg-transparent text-lg font-bold"
              >
                <BsJournalPlus className="text-2xl" />
                Add Your Story
              </NavLink>
              <NavLink
                to="/dashBoard/application"
                className="btn justify-start border-none bg-transparent text-lg font-bold"
              >
                <VscGitStashApply className="text-2xl" />
                Join Us
              </NavLink>
            </>
          )}
          {/* Shared Nav links */}
          <div className="divider"></div>
          <NavLink
            to="/"
            className="btn justify-start border-none bg-transparent text-lg font-bold"
          >
            <IoHomeOutline className="text-2xl" />
            Home
          </NavLink>
          <NavLink
            to="/trips"
            className="btn justify-start border-none bg-transparent text-lg font-bold"
          >
            <MdOutlineTravelExplore className="text-2xl" />
            Trips
          </NavLink>
          <NavLink
            to="/community"
            className="btn justify-start border-none bg-transparent text-lg font-bold"
          >
            <GrGroup className="text-2xl" />
            Community
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default DashBoardLayout;
