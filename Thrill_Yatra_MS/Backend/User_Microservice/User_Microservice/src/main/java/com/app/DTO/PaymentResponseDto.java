package com.app.DTO;

import java.time.LocalDate;

public class PaymentResponseDto {

	  private Long paymentId;
	    private Double amount;
	    private LocalDate paymentDate;
	    private String paymentStatus;

	    private Long bookingId;
	    private Long userId;
	    private String userName;
	    private Long adventureId;
	    private String adventureTitle;
		public Long getPaymentId() {
			return paymentId;
		}
		public void setPaymentId(Long paymentId) {
			this.paymentId = paymentId;
		}
		public Double getAmount() {
			return amount;
		}
		public void setAmount(Double amount) {
			this.amount = amount;
		}
		public LocalDate getPaymentDate() {
			return paymentDate;
		}
		public void setPaymentDate(LocalDate paymentDate) {
			this.paymentDate = paymentDate;
		}
		public String getPaymentStatus() {
			return paymentStatus;
		}
		public void setPaymentStatus(String paymentStatus) {
			this.paymentStatus = paymentStatus;
		}
		public Long getBookingId() {
			return bookingId;
		}
		public void setBookingId(Long bookingId) {
			this.bookingId = bookingId;
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
