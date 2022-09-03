import React from "react";
import { Route, Navigate } from "react-router-dom";
import isLogin from "./isLogin";

const PrivateRoute = ({ component: Component }) => {
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    isLogin() ? Component : <Navigate to="/login" />
  );
};

export default PrivateRoute;
