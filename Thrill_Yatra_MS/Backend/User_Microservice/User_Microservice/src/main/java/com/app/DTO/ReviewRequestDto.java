package com.app.DTO;

public class ReviewRequestDto {
	private Long userId;
    private Long adventureId;
    private String comment;
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
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
    
}
