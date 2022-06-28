package it.akademija.book;

import javax.persistence.Column;
import javax.validation.constraints.NotEmpty;

public class BookDTO {
	
	private Long isbn;
	
	private String name;
	
	private String summary;
	
	private Long pagesNum;

	public BookDTO(Long isbn, String name, String summary, Long pagesNum) {
		super();
		this.isbn = isbn;
		this.name = name;
		this.summary = summary;
		this.pagesNum = pagesNum;
	}

	public Long getIsbn() {
		return isbn;
	}

	public void setIsbn(Long isbn) {
		this.isbn = isbn;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSummary() {
		return summary;
	}

	public void setSummary(String summary) {
		this.summary = summary;
	}

	public Long getPagesNum() {
		return pagesNum;
	}

	public void setPagesNum(Long pagesNum) {
		this.pagesNum = pagesNum;
	}
	
	
}
