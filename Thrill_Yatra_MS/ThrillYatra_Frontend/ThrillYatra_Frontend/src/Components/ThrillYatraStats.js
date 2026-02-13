import React from "react";
import {
  FaMountain,
  FaUsers,
  FaMapMarkedAlt,
  FaCalendarCheck,
  FaStar,
  FaShieldAlt,
} from "react-icons/fa";
import "./ThrillYatraStats.css";

const ThrillYatraStats = () => {
  const stats = [
    {
      icon: <FaMountain />,
      value: "120+",
      description: "Adventure Experiences",
    },
    {
      icon: <FaUsers />,
      value: "8,000+",
      description: "Happy Travelers",
    },
    {
      icon: <FaMapMarkedAlt />,
      value: "35+",
      description: "Destinations Covered",
    },
    {
      icon: <FaCalendarCheck />,
      value: "5,000+",
      description: "Successful Bookings",
    },
    {
      icon: <FaStar />,
      value: "4.8 / 5",
      description: "Average User Rating",
    },
    {
      icon: <FaShieldAlt />,
      value: "100%",
      description: "Safe & Verified Adventures",
    },
  ];

  return (
    <div className="thrill-stats-container">
      {stats.map((stat, index) => (
        <div key={index} className="thrill-stat-card">
          <div className="thrill-icon">{stat.icon}</div>
          <h2 className="thrill-value">{stat.value}</h2>
          <p className="thrill-description">{stat.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ThrillYatraStats;
