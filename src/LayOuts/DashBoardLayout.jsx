import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import Footer from "../pages/Shared/Footer";
import { ImEarth, ImProfile } from "react-icons/im";
import { CgProfile } from "react-icons/cg";
import { TbBrandBooking } from "react-icons/tb";
import { SiStorybook } from "react-icons/si";
import { VscGitStashApply } from "react-icons/vsc";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineHistoryEdu, MdOutlineTravelExplore } from "react-icons/md";
import { GrGroup } from "react-icons/gr";
import useBooking from "../hooks/useBooking";
import { FaUsersGear } from "react-icons/fa6";
import { LuPackagePlus } from "react-icons/lu";
import useAdmin from "../hooks/useAdmin";
import useGuide from "../hooks/useGuide";
import { BsJournalPlus } from "react-icons/bs";

const DashBoardLayout = () => {
  const [bookings] = useBooking();
  const [isAdmin] = useAdmin();
  const [isGuide] = useGuide();
  // const links = (
  //   <>
  //     <NavLink
  //       to="/dashBoard/myProfile"
  //       className="btn justify-start border-none bg-transparent text-lg font-bold"
  //     >
  //       <CgProfile className="text-2xl" />
  //       My Profile
  //     </NavLink>
  //     <NavLink
  //       to="/dashBoard/myBookings"
  //       className="btn justify-start border-none bg-transparent text-lg font-bold"
  //     >
  //       <TbBrandBooking className="text-2xl" />
  //       My Bookings
  //     </NavLink>
  //     <NavLink
  //       to="/dashBoard/myStories"
  //       className="btn justify-start border-none bg-transparent text-lg font-bold"
  //     >
  //       <SiStorybook className="text-2xl" />
  //       My Stories
  //     </NavLink>
  //     <NavLink
  //       to="/dashBoard/addStories"
  //       className="btn justify-start border-none bg-transparent text-lg font-bold"
  //     >
  //       <SiStorybook className="text-2xl" />
  //       Add Your Story
  //     </NavLink>
  //     <NavLink
  //       to="/dashBoard/application"
  //       className="btn justify-start border-none bg-transparent text-lg font-bold"
  //     >
  //       <VscGitStashApply className="text-2xl" />
  //       Join Us
  //     </NavLink>
  //   </>
  // );
  return (
    <div className="bg-secondary">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center m-10">
          <Outlet></Outlet>
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
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
                  Manage Users({bookings?.length})
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
      <Footer></Footer>
    </div>
  );
};

export default DashBoardLayout;
