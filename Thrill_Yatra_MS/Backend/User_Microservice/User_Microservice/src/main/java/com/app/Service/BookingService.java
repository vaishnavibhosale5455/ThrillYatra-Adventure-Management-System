package com.app.Service;

import java.util.List;

import com.app.DTO.BookingResponseDto;
import com.app.DTO.BookingWrapperDto;

public interface BookingService {

	BookingResponseDto bookAdventure( BookingWrapperDto dto);

	void cancelBooking(Long bookingId);

	List<BookingResponseDto> getBookingsByUserId(Long userId);
	List<BookingResponseDto> getAllBookings();

}
