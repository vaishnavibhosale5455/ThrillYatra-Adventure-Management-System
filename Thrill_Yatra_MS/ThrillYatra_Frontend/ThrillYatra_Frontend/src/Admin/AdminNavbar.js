import React, { useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { FaUserShield, FaSignOutAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import "./AdminNavbar.css";

function AdminNavbar() {
  const navigate = useNavigate();
  const userName = sessionStorage.getItem("userName");

  useEffect(() => {
    const logoutChannel = new BroadcastChannel("logout-channel");
    logoutChannel.onmessage = (event) => {
      if (event.data.type === "logout") {
        navigate("/");
      }
    };
    return () => logoutChannel.close();
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.clear();

    const logoutChannel = new BroadcastChannel("logout-channel");
    logoutChannel.postMessage({ type: "logout" });
    logoutChannel.close();

    toast.info("Logged out successfully", { autoClose: 1200 });
    navigate("/");
  };

  return (
    <header className="thrill-admin-navbar">
      {/* Brand */}
      <NavLink to="/admin" className="thrill-admin-logo">
        ThrillYatra
        <span>Admin</span>
      </NavLink>

      {/* Right Section */}
      <div className="thrill-admin-actions">

        <button className="admin-logout-btn" onClick={handleLogout}>
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}

export default AdminNavbar;
