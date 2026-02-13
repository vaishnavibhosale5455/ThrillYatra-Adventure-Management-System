import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addReview } from "../API/api";
import "./AddReview.css";

function AddReview() {
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  const { adventureId } = useParams(); 
  const userId = sessionStorage.getItem("userId");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      toast.warn("Please enter your review.");
      return;
    }

    try {
      await addReview({
        userId: Number(userId),
        adventureId: Number(adventureId),
        comment,
      });

      toast.success("Thank you for your feedback!");
      setComment("");

      setTimeout(() => navigate("/mybookings"), 1500);
    } catch {
      toast.error("Unable to submit review. Try again.");
    }
  };

  return (
    <>
      <ToastContainer />

      <div className="review-page">
        <div className="review-card shadow-lg">
          <h2 className="review-title">Share Your Experience</h2>

          <form onSubmit={handleSubmit}>
            <label className="review-label">Your Review</label>

            <textarea
              className="review-textarea"
              rows="4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us how your adventure was..."
            />

            <button type="submit" className="review-btn">
              Post Review
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddReview;
