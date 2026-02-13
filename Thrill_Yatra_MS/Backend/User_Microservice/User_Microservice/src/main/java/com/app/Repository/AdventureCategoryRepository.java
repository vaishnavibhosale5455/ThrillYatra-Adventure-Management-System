package com.app.Repository;



import org.springframework.data.jpa.repository.JpaRepository;

import com.app.Entity.AdventureCategory;

public interface AdventureCategoryRepository extends  JpaRepository<AdventureCategory, Long> {

	boolean existsByName(String name);
}
