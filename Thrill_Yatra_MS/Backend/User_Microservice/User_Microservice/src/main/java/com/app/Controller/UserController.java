package com.app.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.DTO.BookingResponseDto;
import com.app.DTO.BookingWrapperDto;
import com.app.DTO.PaymentRequestDto;
import com.app.DTO.UserRequestDto;
import com.app.Entity.Adventure;
import com.app.Entity.AdventureCategory;
import com.app.Entity.User;
import com.app.Service.AdventureCategoryService;
import com.app.Service.AdventureService;
import com.app.Service.BookingService;
import com.app.Service.PaymentService;
import com.app.Service.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

	@Autowired
	private AdventureService adventureService;

	@Autowired
	private AdventureCategoryService categoryService;

	@Autowired
	private UserService userService;

	@Autowired
	private BookingService bookingService;

	@Autowired
	private PaymentService paymentService;
	

	@GetMapping("/getAdventuresByCategory/{categoryId}")
	public ResponseEntity<List<Adventure>> getAdventuresByCategory(@PathVariable Long categoryId) {

		return ResponseEntity.ok(adventureService.getAdventuresByCategory(categoryId));
	}

	@GetMapping("/getAllCategories")
	public ResponseEntity<List<AdventureCategory>> getAllCategories() {
		return ResponseEntity.ok(categoryService.getAllCategories());
	}

	@PostMapping("/bookAdventure")
	public ResponseEntity<BookingResponseDto> bookAdventure(@RequestBody BookingWrapperDto dto) {

		BookingResponseDto booking =bookingService.bookAdventure( dto);
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(booking);
	}

	@PostMapping("/makePayment")
	public ResponseEntity<String> makePayment(@RequestBody PaymentRequestDto dto) {

		paymentService.savePayment(dto);
		return ResponseEntity.ok("Payment saved successfully");
	}

	@PostMapping("/registerUser")
	public ResponseEntity<User> registerUser(@RequestBody UserRequestDto dto) {

		User saved = userService.registerUser(dto);
		
		return ResponseEntity.status(HttpStatus.CREATED).body(saved);
	}

	
		@PutMapping("/cancelBooking/{bookingId}")
		public ResponseEntity<String> cancelBooking(@PathVariable Long bookingId) {

		    bookingService.cancelBooking(bookingId);
		    return ResponseEntity.ok("Booking cancelled successfully");
		}
		
		
		 @GetMapping("/getBookingsByUserId/{userId}")
		    public ResponseEntity<List<BookingResponseDto>> getBookingsByUserId(
		            @PathVariable Long userId) {

		        return ResponseEntity.ok(
		                bookingService.getBookingsByUserId(userId)
		        );
		    }
		 @GetMapping("/getAllBookings")
		    public ResponseEntity<List<BookingResponseDto>> getAllBookings() {
		        return ResponseEntity.ok(bookingService.getAllBookings());
		    }
		 


		

}
