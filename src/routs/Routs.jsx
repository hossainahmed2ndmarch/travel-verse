import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../LayOuts/MainLayout";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home/Home/Home";
import PackageDetails from "../components/PackageDetails";
import Trips from "../pages/Trips/Trips";
import Community from "../pages/Community/Community";
import AboutUs from "../pages/AboutUs/AboutUs";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import GuideProfile from "../components/GuideProfile";
import DashBoardLayout from "../LayOuts/DashBoardLayout";
import TouristProfile from "../pages/DashBoard/TouristHome/TouristProfile";
import MyBookings from "../pages/DashBoard/TouristHome/MyBookings";
import ManageStories from "../pages/DashBoard/TouristHome/ManageStories";
import AddStories from "../pages/DashBoard/TouristHome/AddStories";
import JoinApplication from "../pages/DashBoard/TouristHome/JoinApplication";
import PrivateRoute from "./PrivateRoute";
import AdminProfile from "../pages/DashBoard/AdminHome/AdminProfile";
import AllUsers from "../pages/DashBoard/AdminHome/AllUsers";
import AddPackage from "../pages/DashBoard/AdminHome/AddPackage";
import ManageCandidates from "../pages/DashBoard/AdminHome/ManageCandidates";
import AddStoriesGuide from "../pages/DashBoard/GuideHome/AddStoriesGuide";
import ManageGuideStories from "../pages/DashBoard/GuideHome/ManageGuideStories";
import MyAssignedTours from "../pages/DashBoard/GuideHome/MyAssignedTours";
import GuideProfileDashboard from "../pages/DashBoard/GuideHome/GuideProfileDashboard";
import Payment from "../pages/DashBoard/payment/Payment";
import AdminRoute from "./AdminRoute";
import AdminOverview from "../pages/DashBoard/AdminHome/AdminOverview";
import GuideOverview from "../pages/DashBoard/GuideHome/GuideOverview";
import TouristOverview from "../pages/DashBoard/TouristHome/TouristOverview";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/package-details/:id",
        element: <PackageDetails></PackageDetails>,
        loader: ({ params }) =>
          fetch(`https://travel-verse-server.vercel.app/packages/${params.id}`),
      },
      {
        path: "trips",
        element: <Trips></Trips>,
      },
      {
        path: "/guide-profile/:id",
        element: <GuideProfile></GuideProfile>,
        loader: ({ params }) =>
          fetch(`https://travel-verse-server.vercel.app/guides/${params.id}`),
      },
      {
        path: "community",
        element: <Community></Community>,
        loader: () => fetch("https://travel-verse-server.vercel.app/stories"),
      },
      {
        path: "about-us",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword></ForgotPassword>,
      },
    ],
  },
  {
    path: "dashBoard",
    element: (
      <PrivateRoute>
        <DashBoardLayout></DashBoardLayout>
      </PrivateRoute>
    ),
    errorElement: <NotFound></NotFound>,
    children: [
      // Admin routs
      {
        path: "adminOverview",
        element: (
          <AdminRoute>
            <AdminOverview></AdminOverview>
          </AdminRoute>
        ),
      },
      {
        path: "adminProfile",
        element: (
          <AdminRoute>
            <AdminProfile></AdminProfile>
          </AdminRoute>
        ),
      },
      {
        path: "allUsers",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "addPackages",
        element: (
          <AdminRoute>
            <AddPackage></AddPackage>
          </AdminRoute>
        ),
      },
      {
        path: "manageCandidates",
        element: (
          <AdminRoute>
            <ManageCandidates></ManageCandidates>
          </AdminRoute>
        ),
      },
      // Guides Routs
      {
        path: "guideOverview",
        element: <GuideOverview></GuideOverview>,
      },
      {
        path: "guideProfile",
        element: <GuideProfileDashboard></GuideProfileDashboard>,
      },
      {
        path: "guideAddStories",
        element: <AddStoriesGuide></AddStoriesGuide>,
      },
      {
        path: "guideStories",
        element: <ManageGuideStories></ManageGuideStories>,
      },
      {
        path: "guideTours",
        element: <MyAssignedTours></MyAssignedTours>,
      },
      // Tourist Routs
      {
        path: "touristOverview",
        element: <TouristOverview></TouristOverview>,
      },
      {
        path: "myProfile",
        element: <TouristProfile></TouristProfile>,
      },
      {
        path: "myBookings",
        element: <MyBookings></MyBookings>,
      },
      {
        path: "myStories",
        element: <ManageStories></ManageStories>,
      },
      {
        path: "addStories",
        element: <AddStories></AddStories>,
      },
      {
        path: "application",
        element: <JoinApplication></JoinApplication>,
      },
      {
        path: "payment",
        element: <Payment></Payment>,
      },
    ],
  },
]);
