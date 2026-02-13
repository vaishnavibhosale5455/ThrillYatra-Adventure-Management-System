package com.app.DTO;

public class BookingWrapperDto {

	 private Long userId;
	    private BookingRequestDto bookingRequestDto;
		public Long getUserId() {
			return userId;
		}
		public void setUserId(Long userId) {
			this.userId = userId;
		}
		public BookingRequestDto getBookingRequestDto() {
			return bookingRequestDto;
		}
		public void setBookingRequestDto(BookingRequestDto bookingRequestDto) {
			this.bookingRequestDto = bookingRequestDto;
		}
	    
}
