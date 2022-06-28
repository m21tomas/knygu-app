package it.akademija.category;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryDAO extends JpaRepository<Category, Long>{
	Category findByName(String name);
	
	void deleteByName(String name);
	
	Page<Category> findAll(Pageable pageable);
}
