package it.akademija.category;

import java.util.Objects;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotEmpty;

import it.akademija.book.Book;

@Entity
//@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) 
public class Category {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@NotEmpty
	@Column
	private String name;
	
	
	@OneToMany(cascade = { CascadeType.ALL}) //, fetch = FetchType.LAZY)
	@JoinColumn(name = "book_id")
	private Set<Book> menu;
	
	public Category() {}
	
	public Category(Long id, @NotEmpty String name) {
		super();
		this.id = id;
		this.name = name;
	}

	public Category(Long id, @NotEmpty String name, Set<Book> menu) {
		super();
		this.id = id;
		this.name = name;
		this.menu = menu;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Set<Book> getMenu() {
		return menu;
	}

	public void setMenu(Set<Book> menu) {
		this.menu = menu;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, name);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Category other = (Category) obj;
		return Objects.equals(id, other.id) && Objects.equals(name, other.name);
	}

	
	
	
	
}
