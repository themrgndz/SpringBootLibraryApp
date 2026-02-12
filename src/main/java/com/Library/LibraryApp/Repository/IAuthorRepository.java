package com.Library.LibraryApp.Repository;

import com.Library.LibraryApp.Model.Author;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IAuthorRepository extends JpaRepository<Author, Long> {
}
