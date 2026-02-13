package com.app.DTO;

import java.time.LocalDate;

public class ReviewResponseDto {

	
	 private Long reviewId;
	    private String comment;
	    private LocalDate reviewDate;

	    private Long userId;
	    private String userName;

	    private Long adventureId;
	    private String adventureTitle;
		public Long getReviewId() {
			return reviewId;
		}
		public void setReviewId(Long reviewId) {
			this.reviewId = reviewId;
		}
		public String getComment() {
			return comment;
		}
		public void setComment(String comment) {
			this.comment = comment;
		}
		public LocalDate getReviewDate() {
			return reviewDate;
		}
		public void setReviewDate(LocalDate reviewDate) {
			this.reviewDate = reviewDate;
		}
		public Long getUserId() {
			return userId;
		}
		public void setUserId(Long userId) {
			this.userId = userId;
		}
		public String getUserName() {
			return userName;
		}
		public void setUserName(String userName) {
			this.userName = userName;
		}
		public Long getAdventureId() {
			return adventureId;
		}
		public void setAdventureId(Long adventureId) {
			this.adventureId = adventureId;
		}
		public String getAdventureTitle() {
			return adventureTitle;
		}
		public void setAdventureTitle(String adventureTitle) {
			this.adventureTitle = adventureTitle;
		}
	    
	    
}
