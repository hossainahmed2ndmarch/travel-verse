import React from 'react';
import useAdmin from '../hooks/useAdmin';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../pages/Loading/Loading';

const AdminRoute = ({children}) => {
 const {user, loading}= useAuth()
 const [isAdmin, isAdminLoading]= useAdmin()
 const location = useLocation();
  // console.log(location);
  if (loading || isAdminLoading) {
    return <Loading></Loading>;
  }
  if (user && user?.email && isAdmin) {
    return children;
  }
  return <Navigate state={location?.pathname} to={"/login"}></Navigate>;
};

export default AdminRoute;