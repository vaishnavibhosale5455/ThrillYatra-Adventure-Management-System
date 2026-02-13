package com.app.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.DTO.AdventureCategoryRequestDto;
import com.app.Entity.AdventureCategory;
import com.app.Repository.AdventureCategoryRepository;

@Service
public class AdventureCategoryServiceImpl implements AdventureCategoryService {
	
	@Autowired
    private AdventureCategoryRepository categoryRepository;

    public AdventureCategory addCategory(AdventureCategoryRequestDto dto) {

        if (categoryRepository.existsByName(dto.getName())) {
            throw new RuntimeException("Category already exists");
        }

        AdventureCategory category = new AdventureCategory();
        System.out.println("DTO name = " + dto.getName());

        category.setName(dto.getName());
        category.setDescription(dto.getDescription());

        return categoryRepository.save(category);
    }
    
    
    public List<AdventureCategory> getAllCategories() {
        return categoryRepository.findAll();
    }

}
