import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { getAdventuresByCategory } from "../API/api";
import "react-toastify/dist/ReactToastify.css";
import "./AdventureList.css";

function AdventureList() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [adventures, setAdventures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdventures = async () => {
      try {
        const response = await getAdventuresByCategory(id);
        setAdventures(response.data);
      } catch {
        toast.error("Failed to load adventures");
      } finally {
        setLoading(false);
      }
    };

    fetchAdventures();
  }, [id]);

  const isBookingDisabled = (date) => {
    const today = new Date();
    const adventureDate = new Date(date);

    today.setHours(0, 0, 0, 0);
    adventureDate.setHours(0, 0, 0, 0);

    return adventureDate <= today;
  };

  const handleBooking = (adv) => {
    const userId = sessionStorage.getItem("userId");
    const userAge = Number(sessionStorage.getItem("userAge"));

    if (!userId) {
      toast.warn("Please login to book adventure");
      navigate("/login");
      return;
    }

    if (userAge < 18) {
      toast.error("You must be 18 years or older to book an adventure");
      return;
    }

    navigate("/payment", {
      state: {
        adventureId: adv.id,
        price: adv.price,
      },
    });
  };

  if (loading) {
    return <p className="status-text">Loading adventures...</p>;
  }

  return (
    <div className="adventure-page">
      <ToastContainer />

      <h2 className="adventure-title">Available Adventures</h2>

      <div className="adventure-grid">
        {adventures.length ? (
          adventures.map((adv) => {
            const disabled = isBookingDisabled(adv.adventureDate);

            return (
              <div className="adventure-card" key={adv.id}>
                <h3>{adv.title}</h3>

                <p className="desc">{adv.description}</p>

                <div className="adventure-info">
                  <span>
                    <strong>Date:</strong> {adv.adventureDate}
                  </span>

                  <span className="price">₹ {adv.price}</span>
                </div>
                <button
                  className={`book-btn ${disabled ? "disabled" : ""}`}
                  disabled={disabled}
                  onClick={() => handleBooking(adv)}
                >
                  {disabled ? "Booking Closed" : "Book Adventure"}
                </button>
              </div>
            );
          })
        ) : (
          <p className="status-text">No adventures available</p>
        )}
      </div>
    </div>
  );
}

export default AdventureList;
