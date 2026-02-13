package com.app.DTO;

public class BookingRequestDto {

	private Long adventureId;
	
	private String BookingStatus;
   
	public Long getAdventureId() {
		return adventureId;
	}
	public void setAdventureId(Long adventureId) {
		this.adventureId = adventureId;
	}
	public String getBookingStatus() {
		return BookingStatus;
	}
	public void setBookingStatus(String bookingStatus) {
		BookingStatus = bookingStatus;
	}

    
    
}
