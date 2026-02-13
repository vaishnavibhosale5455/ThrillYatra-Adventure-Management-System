package com.app.Service;

import java.util.List;

import com.app.DTO.AdventureRequestDto;
import com.app.DTO.AdventureResponseDto;
import com.app.Entity.Adventure;

public interface AdventureService {

	Adventure addAdventure(AdventureRequestDto dto);

	List<Adventure> getAdventuresByCategory(Long categoryId);

	List<AdventureResponseDto>  getAdventuresByCategoryForAdmin();

}
