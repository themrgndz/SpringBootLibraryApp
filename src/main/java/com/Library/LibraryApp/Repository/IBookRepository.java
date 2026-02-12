package com.Library.LibraryApp.Repository;

import com.Library.LibraryApp.Model.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IBookRepository extends JpaRepository<Book, Long> {
    List<Book> findByTitleContainingIgnoreCaseOrIsbnContainingIgnoreCase(String title, String isbn);
    List<Book> findByTitleContainingIgnoreCase(String title);
    List<Book> findByIsbnContainingIgnoreCase(String isbn);
    List<Book> findByAuthorNameContainingIgnoreCase(String authorName);
}
