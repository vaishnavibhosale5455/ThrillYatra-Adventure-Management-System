package com.app.Service;

import java.util.List;

import com.app.DTO.AdventureCategoryRequestDto;
import com.app.Entity.AdventureCategory;

public interface AdventureCategoryService {

	AdventureCategory addCategory(AdventureCategoryRequestDto dto);

	List<AdventureCategory>getAllCategories();

}
