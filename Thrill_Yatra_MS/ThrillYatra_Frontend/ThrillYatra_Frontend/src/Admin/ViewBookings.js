import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import { getAllBookings } from "../API/api";
import { toast } from "react-toastify";
import "./ViewBookings.css";

function ViewBookings() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await getAllBookings();
      setBookings(res.data || []);
    } catch {
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  /* 🔍 Search + Filter */
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch = b.adventureTitle
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" ||
      b.bookingStatus.toUpperCase() === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <AdminNavbar />

      <div className="booking-page">
        <h2 className="page-title">Adventure Bookings</h2>

        {/* Filters */}
        <div className="booking-filters">
          <input
            type="text"
            placeholder="Search by adventure name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">All Status</option>
            <option value="BOOKED">Booked</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>

        {/* Table */}
        <div className="booking-table-wrapper">
          {loading ? (
            <p className="status-text">Loading bookings...</p>
          ) : (
            <table className="booking-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>User</th>
                  <th>Adventure</th>
                  <th>Booking Date</th>
                  <th>Status</th>
                  <th>Amount (₹)</th>
                </tr>
              </thead>

              <tbody>
                {filteredBookings.length > 0 ? (
                  filteredBookings.map((b, index) => (
                    <tr key={b.bookingId}>
                      <td>{index + 1}</td>
                      <td>{b.name}</td>
                      <td>{b.adventureTitle}</td>
                      <td>{b.bookingDate}</td>
                      <td>
                        <span
                          className={`status ${b.bookingStatus.toLowerCase()}`}
                        >
                          {b.bookingStatus}
                        </span>
                      </td>
                      <td>₹{b.bookingAmount ?? "-"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="no-data">
                      No bookings found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

export default ViewBookings;
