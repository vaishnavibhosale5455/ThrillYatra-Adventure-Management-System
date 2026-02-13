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

import com.app.DTO.AdventureCategoryRequestDto;
import com.app.DTO.AdventureRequestDto;
import com.app.DTO.AdventureResponseDto;
import com.app.Entity.Adventure;
import com.app.Entity.AdventureCategory;
import com.app.Service.AdventureCategoryService;
import com.app.Service.AdventureService;


@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdventureController {

	 @Autowired
	    private AdventureCategoryService categoryService;
	 
	 @Autowired
	    private AdventureService adventureService;
	
	 @PostMapping("/addCategory")
	    public AdventureCategory addCategory(
	            @RequestBody AdventureCategoryRequestDto dto) {

	        System.out.println("DTO name in controller = " + dto.getName());
	        return categoryService.addCategory(dto);
	    }
	    
	    @GetMapping("/getAllCategories")
	    public ResponseEntity<List<AdventureCategory>> getAllCategories() {
	        return ResponseEntity.ok(categoryService.getAllCategories());
	    }
	    
	    

	    @PostMapping("/addAdventure")
	    public ResponseEntity<Adventure> addAdventure(
	            @RequestBody AdventureRequestDto dto) {

	        Adventure saved = adventureService.addAdventure(dto);
	        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
	    }
	    
	    
	    @GetMapping("/getAllAdventures")
	    public ResponseEntity<List<AdventureResponseDto>> getAdventuresByCategory(
	           ) {

	        return ResponseEntity.ok(
	                adventureService.getAdventuresByCategoryForAdmin()
	        );
	    }
	    
	   
	    
}
