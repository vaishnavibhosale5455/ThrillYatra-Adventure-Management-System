import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import { toast, ToastContainer } from "react-toastify";
import { getAllPaidPayments } from "../API/api";
import "react-toastify/dist/ReactToastify.css";
import "./ViewPayments.css";

function ViewPayments() {
  const [payments, setPayments] = useState([]);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);

  /* -------- Fetch Payments -------- */
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await getAllPaidPayments();
        setPayments(res.data || []);
      } catch {
        toast.error("Failed to load payments");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  /* -------- Filter Logic -------- */
  const filteredPayments =
    statusFilter === "ALL"
      ? payments
      : payments.filter((p) => p.status === statusFilter);

  return (
    <>
      <AdminNavbar />
      <ToastContainer />

      <div className="payment-page">
        <h2 className="payment-title">Payments</h2>

        {/* Filters */}
        <div className="payment-filters">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">All Payments</option>
            <option value="PAID">Paid</option>
            <option value="REFUNDED">Refunded</option>
          </select>
        </div>

        {/* Table */}
        {loading ? (
          <p className="status-text">Loading payments...</p>
        ) : (
          <div className="payment-table-wrapper">
            <table className="payment-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Amount (₹)</th>
                  <th>Payment Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredPayments.length > 0 ? (
                  filteredPayments.map((p, index) => (
                    <tr key={p.id}>
                      <td>{index + 1}</td>
                      <td>₹{p.amount}</td>
                      <td>{p.paymentDate}</td>
                      <td>
                        <span
                          className={`pay-status ${p.status.toLowerCase()}`}
                        >
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="no-data">
                      No payments found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default ViewPayments;
