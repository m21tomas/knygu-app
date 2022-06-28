package it.akademija.book;

import java.util.Objects;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotEmpty;

import it.akademija.category.Category;

@Entity
public class Book {
	
	@Id
	@Column
	private Long isbn;
	
	@NotEmpty
	@Column
	private String name;
	
	@NotEmpty
	@Column
	private String summary;
	
	@NotEmpty
	@Column
	private Long pagesNum;
	
	@Column
	private String imagename;
	
	@ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.DETACH, CascadeType.MERGE}, fetch = FetchType.LAZY)
	@JoinColumn(name = "category_id")
	private Category category;
	
	public Book() {}

	public Book(Long isbn, @NotEmpty String name, @NotEmpty String summary, @NotEmpty Long pagesNum, String imagename,
			Category category) {
		super();
		this.isbn = isbn;
		this.name = name;
		this.summary = summary;
		this.pagesNum = pagesNum;
		this.imagename = imagename;
		this.category = category;
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

	public String getImagename() {
		return imagename;
	}

	public void setImagename(String imagename) {
		this.imagename = imagename;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	@Override
	public int hashCode() {
		return Objects.hash(isbn, name);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Book other = (Book) obj;
		return Objects.equals(isbn, other.isbn) && Objects.equals(name, other.name);
	}
	
	
	
}
