import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../admin/Dashboard";
import GsDetails from "../admin/GsDetails";
import NoPage from "../admin/NoPage";
import AdminSidebar from "../admin/AdminSidebar";
import Bookings from "../admin/Bookings";
import AdminLogin from "../admin/AdminLogin";
import Quotes from "../admin/Quotes";
import Users from "../admin/Users";
import Games from "../admin/Games";
import Feedbacks from "../admin/Feedbacks";
import Payments from "../admin/Payments";
import Hosts from "../admin/Hosts";
import HostStations from "../admin/HostStations";
import GameStationProfile from "../admin/GameStationProfile";

const AdminRoutes = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedAdminIn") === "true"
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const loggedInStatus = localStorage.getItem("isLoggedAdminIn") === "true";
      setIsLoggedIn(loggedInStatus);
      if (loggedInStatus) clearInterval(interval);
    }, 1000); // Adjust the interval as needed

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {!isLoggedIn && <Navigate to="/admin/login" replace />}
      <Routes>
        <Route path="login" element={<AdminLogin />} />
        {isLoggedIn && (
          <Route path="*" element={<AdminSidebar></AdminSidebar>}>
            <Route index element={<Dashboard />} />
            <Route path="hosts" element={<Hosts />} />
            <Route path="hosts/:hostId" element={<HostStations />} />
            <Route path="station/:stationId" element={<GameStationProfile />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="feedbacks" element={<Feedbacks />} />
            <Route path="payments" element={<Payments />} />
            <Route path="quotes" element={<Quotes />} />
            <Route path="games" element={<Games />} />
            <Route path="users" element={<Users />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="gameStations" element={<GsDetails />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        )}
      </Routes>
    </>
  );
};

export default AdminRoutes;
