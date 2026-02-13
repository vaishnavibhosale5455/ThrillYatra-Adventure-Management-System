package com.app.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.Entity.Adventure;

public interface AdventureRepository extends JpaRepository<Adventure, Long> {
	
	  List<Adventure> findByCategoryId(Long categoryId);

}
