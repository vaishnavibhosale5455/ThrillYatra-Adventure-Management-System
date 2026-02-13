package com.app.Service;

import java.util.List;

import com.app.DTO.ReviewRequestDto;
import com.app.DTO.ReviewResponseDto;

public interface ReviewService {
	ReviewResponseDto addReview(ReviewRequestDto dto);

	List<ReviewResponseDto> getAllReviews();

}
