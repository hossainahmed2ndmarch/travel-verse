import React, { useEffect, useMemo, useState } from "react";
import { ImEarth } from "react-icons/im";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import userIcon from "../../assets/user.png";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { GiHamburgerMenu } from "react-icons/gi";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); 
  const isAboutPage = location.pathname === "/about-us";

  // Ensure we don't access undefined values before the data loads
  // const dashboardPath = useMemo(() => {
  //   if (isAdminLoading || isGuideLoading) return null; // Don't set path until data is ready
  //   if (isAdmin) return "/dashBoard/adminProfile";
  //   if (isGuide) return "/dashBoard/guideProfile";
  //   return "/dashBoard/myProfile";
  // }, [isAdmin, isGuide, isAdminLoading, isGuideLoading]);

  // Handle Logout
  const handleLogOut = () => {
    toast.info("🚪 You have successfully logged out. See you soon!", {
      icon: "👋",
    });
    logOut();
    navigate("/");
  };

  // Scroll Listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation Links
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

      {/* Dashboard Link (only if role data is loaded) */}
      {user && user?.email && (
        <NavLink
          to="/dashBoard"
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
          Dashboard
        </NavLink>
      )}
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
      className={`navbar fixed top-0 left-0 w-full px-6 z-10 text-white transition-all duration-300 
      ${isAboutPage ? "bg-green-600" : isScrolled ? "bg-opacity-80 shadow-lg bg-green-500" : "bg-opacity-50 bg-gray-700"}`}
    >
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <GiHamburgerMenu className="text-2xl text-green-600" />
          </div>
          <ul
            tabIndex={0}
            className={`menu menu-sm dropdown-content bg-black rounded-box z-[1] mt-3 w-52 p-2 space-x-4 shadow transition-all ${
              isScrolled ? "text-slate-200 bg-green-600" : "text-white"
            }`}
          >
            {navLinks}
          </ul>
        </div>
        <Link to='/' className="btn btn-ghost text-3xl">
          <span className="text-green-400">
            <ImEarth />
          </span>
          TravelVerse
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-4">{navLinks}</ul>
      </div>
      <div className="navbar-end flex items-center space-x-4">
        {user && user?.email ? (
          <button
            onClick={handleLogOut}
            className="btn hidden md:flex border-none bg-transparent text-lg text-white font-bold transition-all"
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
                <NavLink to='/dashBoard'>Dashboard</NavLink>
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
