package com.app.DTO;

import java.time.LocalDate;

public class AdventureResponseDto {

	
	private Long id;
    private String title;
    private String description;
    private double price;
    private LocalDate adventureDate;
    private Long categoryId;
    private String categoryName;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public LocalDate getAdventureDate() {
		return adventureDate;
	}
	public void setAdventureDate(LocalDate adventureDate) {
		this.adventureDate = adventureDate;
	}
	public Long getCategoryId() {
		return categoryId;
	}
	public void setCategoryId(Long categoryId) {
		this.categoryId = categoryId;
	}
	public String getCategoryName() {
		return categoryName;
	}
	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}
    
}
