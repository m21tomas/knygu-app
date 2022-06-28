package it.akademija.category;

import java.util.List;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/categories")
public class CategoryController {
	
	private static final Logger LOG = LoggerFactory.getLogger(CategoryController.class);
	
	@Autowired
	private CategoryService categoryService;
	
	/**
	 * 
	 * Controller function strictly for an administrator to create new category
	 * 
	 * @param data
	 * @return message
	 */
	@Secured({ "ROLE_ADMIN" })
	@PostMapping("/category/new")
	public ResponseEntity<String> createNewCategory(@RequestBody CategoryDTO data) {

		String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();

		String categoryName = data.getName();
		
		if(categoryService.existsById(categoryName)) {
			
			String alreadyExists = "Administratorius " + currentUsername + " bandė sukurti jau esančią kategorija";
			
			LOG.warn(alreadyExists);
			
			return new ResponseEntity<String>(alreadyExists, HttpStatus.CONFLICT);
		}
		else if(categoryService.createNewCategory(data)) {
			LOG.info("Administratorius [{}] sukūrė naują maitinimo įstaigą - [{}]", currentUsername, data.getName());
			
			return new ResponseEntity<String>("Kategorija išsaugota", HttpStatus.CREATED);
		}
		else {
			LOG.error("Kategorijos sukurti nepavyko");
			
			return new ResponseEntity<String>("Maitinimo įstaigos sukurti nepavyko", HttpStatus.BAD_REQUEST);
		}
	}
	
	
	
	/**
	 * 
	 * Function to return a list of all canteens in the database
	 * 
	 * @param data
	 * @return message
	 */
	@Secured({ "ROLE_READER", "ROLE_ADMIN" })
	@RequestMapping(value="/allCategories", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<CategoryDTO>> getAllCanteens(){
		
		String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
		
		List<CategoryDTO> listOfCategories = categoryService.getAllCategories();
		
		if(listOfCategories.size() > 0) {
			LOG.info("Visos kategorijos perduotos frontui. Naudotojas: [{}]", currentUsername);
		    return new ResponseEntity<List<CategoryDTO>>(listOfCategories, HttpStatus.OK);
		}
		else {
			LOG.error("Nepavyko gauti ir grąžinti kategoriju");
			
		    return ResponseEntity.badRequest().body(null);
		}	
	}
	
	/**
	 * Retrieves a Canteen by its id
	 * 
	 * @return an categories data
	 */
	@Secured({ "ROLE_USER", "ROLE_ADMIN" })
	@GetMapping("/canteen/{id}")
	public ResponseEntity<CategoryDTO> getCanteenWithImageById(@PathVariable @Valid Long id)  {

		String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
		
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		String role = "";
		if (auth != null) {
		   role = auth.getAuthorities().stream().map(t -> t.getAuthority()).toString();
		}
			
		CategoryDTO entity = categoryService.getCategoryById(id);
		
		if(auth != null && entity != null) {
			LOG.info("[{}] [{}] pasirinko kategorija: [{}]", role, currentUsername, entity.getName());
			
			return new ResponseEntity<CategoryDTO>(entity, HttpStatus.OK);
		}
		else if(auth != null) {
			LOG.error("Neautorizuotas bandymas gauti kategorija su id: [{}]", id);
			
			return ResponseEntity.badRequest().build();
		}
		else if (entity == null) {
			LOG.warn("[{}] [{}] pasirinko kategorija, kurios nėra, id: [{}]", role, currentUsername, id);
			
			return ResponseEntity.notFound().build();
		}
		
		return ResponseEntity.badRequest().build();
	}

	/**
	 * Returns a page of all canteens.
	 * 
	 * @return page of all canteens
	 */
	@Secured({ "ROLE_USER", "ROLE_ADMIN" })
	@GetMapping(path = "/allCategoriesPage")
	public Page<CategoryDTO> getAPageOfAllCanteens(@RequestParam("page") int page, @RequestParam("size") int size) {

		Sort.Order order = new Sort.Order(Sort.Direction.ASC, "id");

		Pageable pageable = PageRequest.of(page, size, Sort.by(order));

		return categoryService.getAPageOfAllCategories(pageable);
	}
	
	@Secured({ "ROLE_ADMIN" })
	@DeleteMapping("/category/delete/{name}")
	public ResponseEntity<String> deleteCanteen(@PathVariable(required = true, name = "name") String name){
		
		String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
		
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		String role = "";
		if (auth != null) {
		   role = auth.getAuthorities().stream().map(t -> t.getAuthority()).toString();
		}
		
		if(categoryService.deleteCategory(name)) {
			LOG.info("[{}] [{}] ištrynė kategorija pavadinimu: [{}]", role, currentUsername, name);
			
			return new ResponseEntity<String>("Kategorija pavadinimu: " + name + " - ištrinta", HttpStatus.OK);
		}
		else {
			LOG.warn("Kategorijos [{}] nėra. Ištrynimas neįvyko.", name);
			
			return new ResponseEntity<String>("Kategorijos pavadinimu: "+name+" nėra. Ištrynimas neįvyko.", HttpStatus.NOT_FOUND);
		}
		
	}
}
