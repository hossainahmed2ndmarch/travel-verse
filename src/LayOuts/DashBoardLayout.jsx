import React from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { ImEarth, ImProfile } from "react-icons/im";
import { CgProfile } from "react-icons/cg";
import { TbBrandBooking } from "react-icons/tb";
import { VscGitStashApply } from "react-icons/vsc";
import {
  IoHomeOutline,
  IoMoonOutline,
  IoStatsChartOutline,
} from "react-icons/io5";
import {
  MdOutlineHistoryEdu,
  MdOutlineTravelExplore,
  MdOutlineWbSunny,
} from "react-icons/md";
import { GrGroup } from "react-icons/gr";
import useBooking from "../hooks/useBooking";
import { FaUsersGear } from "react-icons/fa6";
import { LuPackagePlus } from "react-icons/lu";
import useAdmin from "../hooks/useAdmin";
import useGuide from "../hooks/useGuide";
import { BsJournalPlus } from "react-icons/bs";
import { Helmet } from "react-helmet-async";
import { GiHamburgerMenu } from "react-icons/gi";
import useAuth from "../hooks/useAuth";
import { useTheme } from "../providers/ThemeProvider";
import { toast } from "react-toastify";

const DashBoardLayout = () => {
  const [bookings] = useBooking();
  const { user, logOut } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isAdmin] = useAdmin();
  const [isGuide] = useGuide();
  const handleLogOut = () => {
    toast.info("🚪 You have successfully logged out. See you soon!", {
      icon: "👋",
    });
    logOut();
    navigate("/");
  };

  return (
    <div className="drawer lg:drawer-open">
      <Helmet>
        <title>Dashboard | TravelVerse</title>
      </Helmet>

      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content  bg-primaryBg flex flex-col items-center">
        {/* Navbar */}
        <div className="navbar fixed left-0 z-10 bg-secondaryBg">
          <div className="flex-1">
            <label
              htmlFor="my-drawer-2"
              className="btn bg-transparent border-none rounded-none hover:bg-transparent shadow-none lg:hidden"
            >
              <GiHamburgerMenu className="text-2xl text-primaryText" />
            </label>
          </div>
          <div className="navbar-end flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              data-tooltip-id="theme-tooltip"
              data-tooltip-content={
                isDark ? "Switch to Light Mode" : "Switch to Dark Mode"
              }
              className="p-2 rounded-full text-primaryText hover:bg-transparent hover:text-primaryText font-semibold bg-transparent border-none shadow-none text-2xl"
            >
              {isDark ? <MdOutlineWbSunny /> : <IoMoonOutline />}
            </button>
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
                  <a>Settings</a>
                </li>
                <li>
                  <button onClick={handleLogOut}>Logout</button>
                </li>
              </ul>
            </div>
          </div>
          <Tooltip id="profile-tooltip" place="bottom" />
          <Tooltip id="theme-tooltip" place="bottom" />
        </div>
        <Outlet></Outlet>
        {/* Footer */}
        <footer className="footer bg-secondaryBg footer-center text-primaryText p-4">
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by
            TravelVerse Company Ltd.
          </p>
        </footer>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <ul className="menu bg-secondaryBg text-base-content min-h-full w-80 p-4">
          <Link
            to="/"
            className="btn btn-ghost shadow-none hover:bg-transparent bg-transparent text-3xl font-bold text-primaryText my-10"
          >
            <span>
              <ImEarth />
            </span>
            TravelVerse
          </Link>
          {isAdmin && (
            <>
              <NavLink
                to="/dashBoard/adminOverview"
                className={({ isActive }) =>
                  `btn justify-start border-none shadow-none hover:bg-transparent bg-transparent text-lg font-bold ${
                    isActive ? "text-primaryText" : "text-secondaryText"
                  }`
                }
              >
                <IoStatsChartOutline className="text-2xl" />
                OverView
              </NavLink>
              <NavLink
                to="/dashBoard/adminProfile"
                className={({ isActive }) =>
                  `btn justify-start border-none shadow-none hover:bg-transparent bg-transparent text-lg font-bold ${
                    isActive ? "text-primaryText" : "text-secondaryText"
                  }`
                }
              >
                <CgProfile className="text-2xl" />
                My Profile
              </NavLink>
              <NavLink
                to="/dashBoard/allUsers"
                className={({ isActive }) =>
                  `btn justify-start border-none shadow-none hover:bg-transparent bg-transparent text-lg font-bold ${
                    isActive ? "text-primaryText" : "text-secondaryText"
                  }`
                }
              >
                <FaUsersGear className="text-2xl" />
                Manage Users
              </NavLink>
              <NavLink
                to="/dashBoard/addPackages"
                className={({ isActive }) =>
                  `btn justify-start border-none shadow-none hover:bg-transparent bg-transparent text-lg font-bold ${
                    isActive ? "text-primaryText" : "text-secondaryText"
                  }`
                }
              >
                <LuPackagePlus className="text-2xl" />
                Add Packages
              </NavLink>
              <NavLink
                to="/dashBoard/manageCandidates"
                className={({ isActive }) =>
                  `btn justify-start border-none shadow-none hover:bg-transparent bg-transparent text-lg font-bold ${
                    isActive ? "text-primaryText" : "text-secondaryText"
                  }`
                }
              >
                <ImProfile className="text-2xl" />
                Recruit Guides
              </NavLink>
            </>
          )}
          {!isAdmin && isGuide && (
            <>
              <NavLink
                to="/dashBoard/guideOverview"
                className={({ isActive }) =>
                  `btn justify-start border-none shadow-none hover:bg-transparent bg-transparent text-lg font-bold ${
                    isActive ? "text-primaryText" : "text-secondaryText"
                  }`
                }
              >
                <IoStatsChartOutline className="text-2xl" />
                OverView
              </NavLink>
              <NavLink
                to="/dashBoard/guideProfile"
                className={({ isActive }) =>
                  `btn justify-start border-none shadow-none hover:bg-transparent bg-transparent text-lg font-bold ${
                    isActive ? "text-primaryText" : "text-secondaryText"
                  }`
                }
              >
                <CgProfile className="text-2xl" />
                My Profile
              </NavLink>
              <NavLink
                to="/dashBoard/guideTours"
                className={({ isActive }) =>
                  `btn justify-start border-none shadow-none hover:bg-transparent bg-transparent text-lg font-bold ${
                    isActive ? "text-primaryText" : "text-secondaryText"
                  }`
                }
              >
                <MdOutlineTravelExplore className="text-2xl" />
                My Assigned Tours
              </NavLink>
              <NavLink
                to="/dashBoard/guideStories"
                className={({ isActive }) =>
                  `btn justify-start border-none shadow-none hover:bg-transparent bg-transparent text-lg font-bold ${
                    isActive ? "text-primaryText" : "text-secondaryText"
                  }`
                }
              >
                <MdOutlineHistoryEdu className="text-2xl" />
                My Stories
              </NavLink>
              <NavLink
                to="/dashBoard/guideAddStories"
                className={({ isActive }) =>
                  `btn justify-start border-none shadow-none hover:bg-transparent bg-transparent text-lg font-bold ${
                    isActive ? "text-primaryText" : "text-secondaryText"
                  }`
                }
              >
                <BsJournalPlus className="text-2xl" />
                Add Stories
              </NavLink>
            </>
          )}{" "}
          {!isAdmin && !isGuide && (
            <>
              <NavLink
                to="/dashBoard/touristOverview"
                className={({ isActive }) =>
                  `btn justify-start border-none shadow-none hover:bg-transparent bg-transparent text-lg font-bold ${
                    isActive ? "text-primaryText" : "text-secondaryText"
                  }`
                }
              >
                <IoStatsChartOutline className="text-2xl" />
                OverView
              </NavLink>
              <NavLink
                to="/dashBoard/myProfile"
                className={({ isActive }) =>
                  `btn justify-start border-none shadow-none hover:bg-transparent bg-transparent text-lg font-bold ${
                    isActive ? "text-primaryText" : "text-secondaryText"
                  }`
                }
              >
                <CgProfile className="text-2xl" />
                My Profile
              </NavLink>
              <NavLink
                to="/dashBoard/myBookings"
                className={({ isActive }) =>
                  `btn justify-start border-none shadow-none hover:bg-transparent bg-transparent text-lg font-bold ${
                    isActive ? "text-primaryText" : "text-secondaryText"
                  }`
                }
              >
                <TbBrandBooking className="text-2xl" />
                My Bookings({bookings?.length})
              </NavLink>
              <NavLink
                to="/dashBoard/myStories"
                className={({ isActive }) =>
                  `btn justify-start border-none shadow-none hover:bg-transparent bg-transparent text-lg font-bold ${
                    isActive ? "text-primaryText" : "text-secondaryText"
                  }`
                }
              >
                <MdOutlineHistoryEdu className="text-2xl" />
                My Stories
              </NavLink>
              <NavLink
                to="/dashBoard/addStories"
                className={({ isActive }) =>
                  `btn justify-start border-none shadow-none hover:bg-transparent bg-transparent text-lg font-bold ${
                    isActive ? "text-primaryText" : "text-secondaryText"
                  }`
                }
              >
                <BsJournalPlus className="text-2xl" />
                Add Your Story
              </NavLink>
              <NavLink
                to="/dashBoard/application"
                className={({ isActive }) =>
                  `btn justify-start border-none shadow-none hover:bg-transparent bg-transparent text-lg font-bold ${
                    isActive ? "text-primaryText" : "text-secondaryText"
                  }`
                }
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
            className="btn justify-start border-none shadow-none hover:bg-transparent bg-transparent text-secondaryText text-lg font-bold"
          >
            <IoHomeOutline className="text-2xl" />
            Home
          </NavLink>
          <NavLink
            to="/trips"
            className="btn justify-start border-none shadow-none hover:bg-transparent bg-transparent text-secondaryText text-lg font-bold"
          >
            <MdOutlineTravelExplore className="text-2xl" />
            Trips
          </NavLink>
          <NavLink
            to="/community"
            className="btn justify-start border-none shadow-none hover:bg-transparent bg-transparent text-secondaryText text-lg font-bold"
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
