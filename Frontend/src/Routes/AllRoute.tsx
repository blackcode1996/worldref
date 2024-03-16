import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "../Pages/Signup/Signup";
import Login from "../Pages/Login/Login";
import Home from "../Pages/Home/Home";
import Navbar from "../component/Navbar";
import PrivateRoute from "./PrivateRoute";

const AllRoute: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    const token = localStorage.getItem("token");
    setUserData(userData ? JSON.parse(userData) : null);
    setToken(token);
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home userData={userData} token={token} />
            </PrivateRoute>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default AllRoute;
