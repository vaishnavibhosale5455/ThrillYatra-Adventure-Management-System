package com.app.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.DTO.ReviewRequestDto;
import com.app.DTO.ReviewResponseDto;
import com.app.Service.ReviewService;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000")
public class ReviewController {

	
	@Autowired
	private ReviewService reviewService;

		
		@PostMapping("/addReview")
		public ResponseEntity<ReviewResponseDto> addReview(
		        @RequestBody ReviewRequestDto dto) {

		    ReviewResponseDto review = reviewService.addReview(dto);
		    return ResponseEntity.status(HttpStatus.CREATED).body(review);
		}
		
		@GetMapping("/getAllReviews")
		public ResponseEntity<List<ReviewResponseDto>> getAllReviews() {

		    List<ReviewResponseDto> reviews = reviewService.getAllReviews();
		    return ResponseEntity.ok(reviews);
		}
		


		

}
