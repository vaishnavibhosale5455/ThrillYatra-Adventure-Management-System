import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  BsPersonCircle,
  BsListCheck,
  BsBoxArrowRight,
  BsChatDots,
} from "react-icons/bs";
import "./Styles.css";

function CustomerNavbar() {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("userId");

  const userName = sessionStorage.getItem("userName");

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark px-3">
      <div className="container-fluid">
        <NavLink className="navbar-brand fw-bold brand-logo" to="/">
          ThrillYatra
        </NavLink>

        <div className="navbar-collapse show">
          <ul className="navbar-nav ms-auto align-items-center gap-3">

            {!userId && (
              <>
                <li className="nav-item">
                  <NavLink to="/login" className="btn btn-outline-warning">
                    Sign In
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink to="/register" className="btn btn-warning text-dark">
                    Sign Up
                  </NavLink>
                </li>
                  <li className="nav-item">
                  <NavLink to="/reviews" className="btn">
                    <BsChatDots className="me-1" />
                    Reviews
                  </NavLink>
                </li>
              </>
            )}

            {userId && (
              <>
                <li className="nav-item">
                  <NavLink
                    to={`/mybookings`}
                    className="btn btn-outline-warning"
                  >
                    <BsListCheck className="me-1" />
                    Bookings
                  </NavLink>
                </li>

               
                <li className="nav-item user-pill">
                  <BsPersonCircle />
                  <span>{userName || "User"}</span>
                </li>

                
                <li className="nav-item">
                  <button
                    className="logout-icon-btn"
                    onClick={handleLogout}
                    title="Logout"
                  >
                    <BsBoxArrowRight />
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default CustomerNavbar;
