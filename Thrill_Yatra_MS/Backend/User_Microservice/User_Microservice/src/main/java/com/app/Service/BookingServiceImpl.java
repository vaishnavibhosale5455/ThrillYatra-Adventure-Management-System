package com.app.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.DTO.BookingResponseDto;
import com.app.DTO.BookingWrapperDto;
import com.app.Entity.Adventure;
import com.app.Entity.Booking;
import com.app.Entity.Payment;
import com.app.Entity.User;
import com.app.Repository.AdventureRepository;
import com.app.Repository.BookingRepository;
import com.app.Repository.UserRepository;

@Service
public class BookingServiceImpl implements BookingService {

	@Autowired
	private BookingRepository bookingRepository;

	@Autowired
	private AdventureRepository adventureRepository;

	@Autowired
	private UserRepository userRepository;

	@Override
	public BookingResponseDto bookAdventure(BookingWrapperDto dto) {
		User currentuser = userRepository.findById(dto.getUserId())
				.orElseThrow(() -> new RuntimeException("User not found"));

		Adventure adventure = adventureRepository.findById(dto.getBookingRequestDto().getAdventureId())
				.orElseThrow(() -> new RuntimeException("Adventure not found"));

		Booking booking = new Booking();
		booking.setUser(currentuser);
		booking.setAdventure(adventure);
		booking.setBookingDate(LocalDate.now());
		booking.setBookingStatus(dto.getBookingRequestDto().getBookingStatus());

		Booking savedBooking = bookingRepository.save(booking);

		BookingResponseDto response = new BookingResponseDto();
		response.setBookingId(savedBooking.getId());
		response.setUserId(currentuser.getId());
		response.setName(currentuser.getName());
		response.setAdventureId(adventure.getId());
		response.setAdventureTitle(adventure.getTitle());
		response.setBookingDate(savedBooking.getBookingDate());
		response.setBookingStatus(savedBooking.getBookingStatus());

		return response;
	}

	public void cancelBooking(Long bookingId) {

		Booking booking = bookingRepository.findById(bookingId)
				.orElseThrow(() -> new RuntimeException("Booking not found"));

		if ("CANCELLED".equalsIgnoreCase(booking.getBookingStatus())) {
			throw new RuntimeException("Booking already cancelled");
		}

		booking.setBookingStatus("CANCELLED");
		bookingRepository.save(booking);

		Payment payment = booking.getPayment();
		if (payment != null) {
			payment.setPaymentStatus("REFUNDED");
		}

		bookingRepository.save(booking);

	}

	public List<BookingResponseDto> getBookingsByUserId(Long userId) {

		List<Booking> bookings = bookingRepository.findByUserId(userId);

		return bookings.stream().map(this::mapToDto).collect(Collectors.toList());
	}

	private BookingResponseDto mapToDto(Booking booking) {

		BookingResponseDto dto = new BookingResponseDto();

		dto.setBookingId(booking.getId());
		dto.setBookingDate(booking.getBookingDate());
		dto.setBookingStatus(booking.getBookingStatus());

		// User
		dto.setUserId(booking.getUser().getId());
		dto.setName(booking.getUser().getName());

		// Adventure
		dto.setAdventureId(booking.getAdventure().getId());
		dto.setAdventureTitle(booking.getAdventure().getTitle());
		dto.setAdvantureDate(booking.getAdventure().getAdventureDate());
		dto.setBookingAmount(booking.getPayment().getAmount());

		return dto;
	}
	
	@Override
	public List<BookingResponseDto> getAllBookings() {

	    return bookingRepository.findAll()
	            .stream()
	            .map(this::mapToDto)
	            .collect(Collectors.toList());
	}

}
