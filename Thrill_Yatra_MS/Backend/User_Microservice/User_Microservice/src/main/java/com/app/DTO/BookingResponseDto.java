package com.app.DTO;

import java.time.LocalDate;

public class BookingResponseDto {
	  private Long bookingId;
	    private Long userId;
	    private String name;
	    private Long adventureId;
	    private String adventureTitle;
	    private LocalDate bookingDate;
	    private String bookingStatus;
	    private LocalDate advantureDate;
	    private double bookingAmount;
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
		public LocalDate getBookingDate() {
			return bookingDate;
		}
		public void setBookingDate(LocalDate bookingDate) {
			this.bookingDate = bookingDate;
		}
		public String getBookingStatus() {
			return bookingStatus;
		}
		public void setBookingStatus(String bookingStatus) {
			this.bookingStatus = bookingStatus;
		}
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
		public LocalDate getAdvantureDate() {
			return advantureDate;
		}
		public void setAdvantureDate(LocalDate advantureDate) {
			this.advantureDate = advantureDate;
		}
		public double getBookingAmount() {
			return bookingAmount;
		}
		public void setBookingAmount(double bookingAmount) {
			this.bookingAmount = bookingAmount;
		}
		
	    
	    
}
