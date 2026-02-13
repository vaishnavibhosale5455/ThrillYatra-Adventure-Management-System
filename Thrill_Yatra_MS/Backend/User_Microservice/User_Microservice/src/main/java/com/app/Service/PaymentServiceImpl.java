package com.app.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.DTO.PaymentRequestDto;
import com.app.DTO.PaymentResponseDto;
import com.app.Entity.Booking;
import com.app.Entity.Payment;
import com.app.Repository.BookingRepository;
import com.app.Repository.PaymentRepository;
@Service
public class PaymentServiceImpl implements PaymentService {

	@Autowired
	private PaymentRepository paymentRepository;

	@Autowired
	private BookingRepository bookingRepository;

	public Payment savePayment(PaymentRequestDto dto) {

		Booking booking = bookingRepository.findById(dto.getBookingId())
				.orElseThrow(() -> new RuntimeException("Booking not found"));

		if (paymentRepository.existsByBookingId(dto.getBookingId())) {
			throw new RuntimeException("Payment already exists for this booking");
		}

		Payment payment = new Payment();
		payment.setBooking(booking);
		payment.setAmount(dto.getAmount());
		payment.setPaymentDate(LocalDate.now());
		payment.setPaymentStatus(dto.getPaymentStatus());

		return paymentRepository.save(payment);
	}
	
	public List<PaymentResponseDto> getAllPaidPayments() {

	    return paymentRepository.findAll()
	            .stream()
	            .map(this::mapToDto)
	            .collect(Collectors.toList());
	}

	    private PaymentResponseDto mapToDto(Payment payment) {

	        PaymentResponseDto dto = new PaymentResponseDto();

	        dto.setPaymentId(payment.getId());
	        dto.setAmount(payment.getAmount());
	        dto.setPaymentDate(payment.getPaymentDate());
	        dto.setPaymentStatus(payment.getPaymentStatus());

	        dto.setBookingId(payment.getBooking().getId());
	        dto.setUserId(payment.getBooking().getUser().getId());
	        dto.setUserName(payment.getBooking().getUser().getName());
	        dto.setAdventureId(payment.getBooking().getAdventure().getId());
	        dto.setAdventureTitle(payment.getBooking().getAdventure().getTitle());

	        return dto;
	    }

}
