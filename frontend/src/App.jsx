import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation} from "react-router-dom";
import Home from "./Pages/Home";
import CarDetails from "./Pages/CarDetails";
import Cars from "./Pages/Cars";
import MyBookings from "./Pages/MyBookings";
import Footer from "./components/Footer";
import Layout from "./Pages/Owner/Layout";
import Dashboard from "./Pages/Owner/Dashboard";
import AddCar from "./Pages/Owner/AddCar";
import ManageCars from "./Pages/Owner/ManageCars";
import ManageBookings from "./Pages/Owner/ManageBookings";
import Login from "./components/Login";
import {Toaster} from 'react-hot-toast';
import { useAppContext } from "./context/AppContext";
import Alluser from "./Pages/Owner/Alluser";


const App = () => {

  const {showLogin} = useAppContext();
  const location = useLocation();
  const isOwnerPath = location.pathname.startsWith("/owner");

  return (
    <div className="relative h-screen overflow-y-auto">
      <Toaster />
      {location.pathname === "/" ? (
        <div className="absolute inset-0 bg-light  z-10"></div>
      ) : (
        <div className="absolute inset-0 bg-white z-10"></div>
      )}
      <div className="relative z-20">
        {showLogin && <Login/>}
        
        {!isOwnerPath && <Navbar/>}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/car-details/:id" element={<CarDetails />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/owner" element={<Layout />}>
            <Route index element={<Dashboard />}/>
            <Route path="add-car" element={<AddCar />} />
            <Route path="manage-cars" element={<ManageCars />} />
            <Route path="manage-bookings" element={<ManageBookings />} />
            <Route path={"all-user"} element={<Alluser />} />
          </Route>
        </Routes>

        {!isOwnerPath && <Footer />}
      </div>
    </div>
  );
};

export default App;
