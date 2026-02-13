import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllReviews } from "../API/api";
import "./Reviews.css";

function Reviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await getAllReviews();
      setReviews(res.data || []);
    } catch {
      toast.error("Unable to load reviews");
    }
  };

  return (
    <>
      <ToastContainer />

      <div className="reviews-page">
        <h2 className="reviews-heading">
          Traveller Experiences
        </h2>

        <p className="reviews-subheading">
          Real stories from real adventurers
        </p>

        {reviews.length ? (
          <div className="review-grid">
            {reviews.map((review) => (
              <div
                key={review.reviewId}
                className="review-card"
              >
                {/* Header */}
                <div className="review-header">
                  <div>
                    <h5 className="review-user">
                      {review.userName}
                    </h5>
                    <span className="review-adventure">
                      {review.adventureTitle}
                    </span>
                  </div>

                  <span className="review-date">
                    {review.reviewDate}
                  </span>
                </div>

                {/* Comment */}
                <p className="review-text">
                  “{review.comment}”
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-reviews">
            No reviews yet. Adventures await!
          </p>
        )}
      </div>
    </>
  );
}

export default Reviews;
