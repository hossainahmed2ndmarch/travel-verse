import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../LayOuts/MainLayout";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home/Home/Home";
import PackageDetails from "../components/PackageDetails";
import Trips from "../pages/Trips/Trips";
import Community from "../pages/Community/Community";
import AboutUs from "../pages/AboutUs/AboutUs";

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
          fetch(`http://localhost:5000/packages/${params.id}`),
      },
      {
        path: "trips",
        element: <Trips></Trips>,
        loader: () => fetch("http://localhost:5000/packages"),
      },
      {
        path: "community",
        element: <Community></Community>,
      },
      {
        path: "about-us",
        element: <AboutUs></AboutUs>,
      },
    ],
  },
]);
