package it.akademija.category;

import java.util.Set;

import it.akademija.book.Book;

public class CategoryDTO {
	
	private String name;
	
	private Set<Book> books;
	
	public CategoryDTO() {};

	public CategoryDTO(String name) {
		super();
		this.name = name;
	}

	public Set<Book> getBooks() {
		return books;
	}

	public void setBooks(Set<Book> books) {
		this.books = books;
	}

	public CategoryDTO(String name, Set<Book> books) {
		super();
		this.name = name;
		this.books = books;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	
	
	
}
