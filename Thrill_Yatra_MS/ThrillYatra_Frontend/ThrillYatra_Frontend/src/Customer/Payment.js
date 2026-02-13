import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { bookAdventure, makePayment } from "../API/api";
import { BsCheckCircleFill, BsCreditCard2Front } from "react-icons/bs";
import "react-toastify/dist/ReactToastify.css";
import "./Payment.css";

export default function PaymentForm() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const { adventureId, price } = state || {};

  const [cardNumber, setCardNumber] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!adventureId || !price) {
    navigate("/");
    return null;
  }

  const validateCard = () => {
    if (!/^\d{16}$/.test(cardNumber)) return "Invalid card number";
    if (!cardHolderName.trim()) return "Card holder name required";
    if (!/^(0[1-9]|1[0-2])\/\d{4}$/.test(expiration))
      return "Expiry must be MM/YYYY";
    if (!/^\d{3}$/.test(cvv)) return "Invalid CVV";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validateCard();
    if (err) {
      setError(err);
      return;
    }

    setLoading(true);

    try {
      const userId = Number(sessionStorage.getItem("userId"));

      /* ---------- 1️⃣ Book Adventure ---------- */
      const bookingRes = await bookAdventure({
        userId,
        bookingRequestDto: {
          adventureId,
          bookingStatus: "Booked",
        },
      });

      const bookingId = bookingRes.data.bookingId;

      /* ---------- 2️⃣ Make Payment ---------- */
      await makePayment({
        bookingId,
        paymentStatus: "PAID",
        amount: price,
      });

      toast.success("Payment successful & adventure booked!");

      setTimeout(() => navigate("/mybookings"), 1500);
    } catch {
      toast.error("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-page">
      <ToastContainer />

      <div className="payment-card">
        <div className="payment-header">
          <BsCreditCard2Front />
          <h3>Secure Payment</h3>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Card Number</label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
            {cardNumber.length === 16 && <BsCheckCircleFill />}
          </div>

          <div className="row">
            <div className="input-group">
              <label>Expiry</label>
              <input
                type="text"
                value={expiration}
                onChange={(e) => setExpiration(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>CVV</label>
              <input
                type="password"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
              />
            </div>
          </div>

          <div className="input-group">
            <label>Card Holder Name</label>
            <input
              type="text"
              value={cardHolderName}
              onChange={(e) => setCardHolderName(e.target.value)}
            />
            {cardHolderName && <BsCheckCircleFill />}
          </div>

          {error && <p className="error-text">{error}</p>}

          <div className="amount-box">
            <h4>Payable Amount: ₹{price}</h4>
          </div>

          <button className="pay-btn" disabled={loading}>
            {loading ? "Processing..." : "CONFIRM PAYMENT"}
          </button>
        </form>
      </div>
    </div>
  );
}
