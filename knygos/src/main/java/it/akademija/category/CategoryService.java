package it.akademija.category;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CategoryService {

	@Autowired
	private CategoryDAO categoryDao;
	
	@Transactional(readOnly = true)
	public CategoryDTO getCategoryById(Long id) {
		
		Category obj = categoryDao.findById(id).orElse(null);
		
		if(obj != null) {

			CategoryDTO cat = new CategoryDTO();
			
			cat.setName(obj.getName());
			
			
			return cat;	
		}
		else return null;
	}
	
	@Transactional(readOnly = true)
	public boolean existsById(String name) {
		
		Category cat = categoryDao.findByName(name);
		
		if(cat == null) {
			return false;
		}
		else {
			return true;
		}
	}
	
	@Transactional
	public boolean createNewCategory(CategoryDTO data) {
		
		Category newEntity = new Category();
		
		newEntity.setName(data.getName());
		newEntity.setMenu(data.getBooks());
		
		Category savedEntity = categoryDao.saveAndFlush(newEntity);
		
		if(savedEntity != null) {
			return true;
		}
		return false;
	}
	
	@Transactional(readOnly = true)
	public List<CategoryDTO> getAllCategories() {
		
		List<Category> canteens = categoryDao.findAll()
                                           .stream()
                                           .sorted(Comparator.comparing(Category::getName))
                                           .collect(Collectors.toList()) ;

		List<CategoryDTO> theList = new ArrayList<CategoryDTO>();
		
		for(Category item : canteens) {
		
			CategoryDTO newItem = new CategoryDTO();
		
		    newItem.setName(item.getName());
		    newItem.setBooks(item.getMenu());

			theList.add(newItem);
		}
				
		return theList;
	}

	public CategoryDAO getcategoryDao() {
		return categoryDao;
	}

	public void setcategoryDao(CategoryDAO categoryDao) {
		this.categoryDao = categoryDao;
	}

	@Transactional(readOnly = true)
	public Page<CategoryDTO> getAPageOfAllCategories(Pageable pageable) {
		Page<Category> canteens = categoryDao.findAll(pageable);
		Page<CategoryDTO> dtoPage = canteens.map(new Function<Category, CategoryDTO>() {

			@Override
			public CategoryDTO apply(Category t) {
				CategoryDTO dto = new CategoryDTO();

				dto.setName(t.getName());
				dto.setBooks(t.getMenu());

				return dto;
			}		
		});
		return dtoPage;	
	}

	@Transactional
	public boolean deleteCategory(String name) {
		
		Category canteen = categoryDao.findByName(name);
		
		if(canteen != null) {
			
			categoryDao.deleteByName(name);
			
			return true;
		}
		
		return false;
	}
	
}
