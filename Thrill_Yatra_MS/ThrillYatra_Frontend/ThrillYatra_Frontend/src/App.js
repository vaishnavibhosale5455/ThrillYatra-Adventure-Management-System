import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import axios from "axios";

// Import Components
import Home from "./Components/HomePage";
import Login from "./Components/Login";
import Register from "./Components/Register";
import AdventureList from "./Components/AdventureList";
import CustomerNavbar from "./Components/CustomerNavbar";

//Import Customer Components
import Payment from "./Customer/Payment";
import Reviews from "./Components/Reviews";
import AddReview from "./Customer/AddReview";
import MyBookings from "./Customer/MyBookings";
import ForgotPassword from "./Customer/ForgotPassword";
import ResetPassword from "./Customer/ResetPassword";

// Admin Components
import AdminDashboard from "./Admin/AdminDashboard";
import AddCategory from "./Admin/AddCategory";
import AddAdventure from "./Admin/AddAdventure";
import ViewBookings from "./Admin/ViewBookings";
import ViewPayments from "./Admin/ViewPayments";

const AppLayout = ({ children }) => {
  const location = useLocation();

  // hide navbar on admin routes
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <CustomerNavbar />}
      {children}
    </>
  );
};

function App() {
  
  return (
    <div className="App">
      <Router>
        <AppLayout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
           
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/categories" element={<AddCategory />} />
            <Route path="/admin/adventures" element={<AddAdventure />} />
            <Route path="/admin/bookings" element={<ViewBookings />} />
            <Route path="/admin/payments" element={<ViewPayments />} />

            <Route path="/payment" element={<Payment />} />
            <Route path="/adventures/:id" element={<AdventureList/>}/>
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/review/:adventureId" element={<AddReview />} />
            <Route path="/mybookings" element={<MyBookings/>}/>
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
        </AppLayout>
      </Router>
    </div>
  );
}

export default App;
