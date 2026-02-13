package com.app.Service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.DTO.AdventureRequestDto;
import com.app.DTO.AdventureResponseDto;
import com.app.Entity.Adventure;
import com.app.Entity.AdventureCategory;
import com.app.Repository.AdventureCategoryRepository;
import com.app.Repository.AdventureRepository;
@Service
public class AdventureServiceImpl implements AdventureService {
	
	@Autowired
    private AdventureRepository adventureRepository;

    @Autowired
    private AdventureCategoryRepository categoryRepository;

   
    public Adventure addAdventure(AdventureRequestDto dto) {

        AdventureCategory category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        Adventure adventure = new Adventure();
        adventure.setTitle(dto.getTitle());
        adventure.setDescription(dto.getDescription());
        adventure.setPrice(dto.getPrice());
        adventure.setAdventureDate(dto.getAdventureDate());
        adventure.setCategory(category);

        return adventureRepository.save(adventure);
    }
    
    
	public List<Adventure> getAdventuresByCategory(Long categoryId) {

        if (!categoryRepository.existsById(categoryId)) {
            throw new RuntimeException("Category not found");
        }

        return adventureRepository.findByCategoryId(categoryId);
    }
	
	public AdventureResponseDto mapToDto(Adventure adventure) {

	    AdventureResponseDto dto = new AdventureResponseDto();
	    dto.setId(adventure.getId());
	    dto.setTitle(adventure.getTitle());
	    dto.setDescription(adventure.getDescription());
	    dto.setPrice(adventure.getPrice());
	    dto.setAdventureDate(adventure.getAdventureDate());

	    dto.setCategoryId(adventure.getCategory().getId());
	    dto.setCategoryName(adventure.getCategory().getName());

	    return dto;
	}
	public List<AdventureResponseDto> getAdventuresByCategoryForAdmin() {

	    return adventureRepository.findAll()
	            .stream()
	            .map(this::mapToDto)
	            .collect(Collectors.toList());
	}


	


}
