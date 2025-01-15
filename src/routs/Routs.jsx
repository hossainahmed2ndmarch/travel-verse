import {
 createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../LayOuts/MainLayout";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home/Home/Home";

export const router = createBrowserRouter([
 {
   path: "/",
   element: <MainLayout></MainLayout>,
   errorElement:<NotFound></NotFound>,
   children:[
    {
     path:'/',
     element:<Home></Home>
    }
   ]
 },
]);