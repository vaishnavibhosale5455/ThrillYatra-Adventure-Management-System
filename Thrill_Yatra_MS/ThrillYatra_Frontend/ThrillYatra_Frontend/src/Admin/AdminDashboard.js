import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaMountain,
  FaPlus,
  FaUsers,
  FaCreditCard,
  FaClipboardList,
} from "react-icons/fa";
import AdminNavbar from "./AdminNavbar";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const actions = [
    {
      icon: <FaMountain />,
      title: "Adventure Categories",
      path: "/admin/categories",
    },
    {
      icon: <FaPlus />,
      title: "Add Adventures",
      path: "/admin/adventures",
    },
    {
      icon: <FaUsers />,
      title: "View Bookings",
      path: "/admin/bookings",
    },

   
  ];

  return (
    <>
    <AdminNavbar/>
    <div className="admin-dashboard">
       
      <h2>Admin Control Center</h2>

      <div className="dashboard-grid">
        {actions.map((item, index) => (
          <div
            key={index}
            className="dashboard-card"
            onClick={() => navigate(item.path)}
          >
            <div className="card-icon">{item.icon}</div>
            <h4>{item.title}</h4>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default AdminDashboard;
