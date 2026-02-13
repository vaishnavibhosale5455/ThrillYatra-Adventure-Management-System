import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUserBookings, cancelBooking } from "../API/api";
import "./MyBookings.css";

function MyBookings() {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("userId");

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await getUserBookings(userId);
      setBookings(res.data);
    } catch {
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [userId]);

  const isPastOrToday = (date) => {
    const today = new Date();
    const d = new Date(date);
    today.setHours(0, 0, 0, 0);
    d.setHours(0, 0, 0, 0);
    return d <= today;
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      await cancelBooking(bookingId);
      toast.success("Booking cancelled successfully");
      fetchBookings();
    } catch {
      toast.error("Cancellation failed");
    }
  };

  if (loading) {
    return <p className="status-text">Loading your bookings...</p>;
  }

  return (
    <div className="my-bookings-page">
      <ToastContainer />

      <h2 className="page-title">My Adventures</h2>

      {bookings.length === 0 ? (
        <p className="status-text">No bookings found</p>
      ) : (
        <div className="booking-grid">
          {bookings.map((b) => {
            const cancelDisabled =
              b.bookingStatus === "CANCELLED" ||
              isPastOrToday(b.advantureDate);

            const reviewEnabled =
              b.bookingStatus !== "CANCELLED" &&
              isPastOrToday(b.advantureDate);

            return (
              <div className="booking-card" key={b.bookingId}>
                <h3>{b.adventureTitle}</h3>

                <div className="info-row">
                  <span>
                    <strong>Booking Date:</strong> {b.bookingDate}
                  </span>
                  <br></br>
                  <span>
                    <strong>Adventure Date:</strong> {b.advantureDate}
                  </span>
                </div>

                <div className="status-row">
                  <span className={`badge ${b.bookingStatus.toLowerCase()}`}>
                    {b.bookingStatus}
                  </span>
                </div>

                <div className="action-row">
                  <button
                    className="cancel-btn"
                    disabled={cancelDisabled}
                    onClick={() => handleCancelBooking(b.bookingId)}
                  >
                    Cancel Booking
                  </button>

                  <button
                    className="review-btn"
                    disabled={!reviewEnabled}
                    onClick={() => navigate(`/review/${b.adventureId}`)}
                  >
                    Write Review
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MyBookings;