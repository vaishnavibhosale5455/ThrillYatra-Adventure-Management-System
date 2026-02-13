package com.app.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.DTO.ReviewRequestDto;
import com.app.DTO.ReviewResponseDto;
import com.app.Entity.Adventure;
import com.app.Entity.Review;
import com.app.Entity.User;
import com.app.Repository.AdventureRepository;
import com.app.Repository.ReviewRepository;
import com.app.Repository.UserRepository;

@Service
public class ReviewServiceImpl implements ReviewService {

	
	 @Autowired
	    private ReviewRepository reviewRepository;

	    @Autowired
	    private UserRepository userRepository;

	    @Autowired
	    private AdventureRepository adventureRepository;

	    public ReviewResponseDto addReview(ReviewRequestDto dto) {

	        User user = userRepository.findById(dto.getUserId())
	                .orElseThrow(() -> new RuntimeException("User not found"));

	        Adventure adventure = adventureRepository.findById(dto.getAdventureId())
	                .orElseThrow(() -> new RuntimeException("Adventure not found"));

	        Review review = new Review();
	        review.setUser(user);
	        review.setAdventure(adventure);
	        review.setComment(dto.getComment());
	        review.setReviewDate(LocalDate.now());

	        Review saved = reviewRepository.save(review);

	        // 🔹 Map to Response DTO
	        ReviewResponseDto response = new ReviewResponseDto();
	        response.setReviewId(saved.getId());
	        response.setComment(saved.getComment());
	        response.setReviewDate(saved.getReviewDate());

	        response.setUserId(user.getId());
	        response.setUserName(user.getName());

	        response.setAdventureId(adventure.getId());
	        response.setAdventureTitle(adventure.getTitle());

	        return response;
	    }
	    
	    public List<ReviewResponseDto> getAllReviews() {

	        List<Review> reviews = reviewRepository.findAll();

	        return reviews.stream().map(review -> {
	            ReviewResponseDto dto = new ReviewResponseDto();

	            dto.setReviewId(review.getId());
	            dto.setComment(review.getComment());
	            dto.setReviewDate(review.getReviewDate());

	            dto.setUserId(review.getUser().getId());
	            dto.setUserName(review.getUser().getName());

	            dto.setAdventureId(review.getAdventure().getId());
	            dto.setAdventureTitle(review.getAdventure().getTitle());

	            return dto;
	        }).collect(Collectors.toList());
	    }


}
