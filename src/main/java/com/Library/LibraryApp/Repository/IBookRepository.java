package com.Library.LibraryApp.Repository;

import com.Library.LibraryApp.Model.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface IBookRepository extends JpaRepository<Book, Long> {
    Page<Book> findByTitleContainingIgnoreCaseOrIsbnContainingIgnoreCase(String title, String isbn, Pageable pageable);
    Page<Book> findByTitleContainingIgnoreCase(String title, Pageable pageable);
    Page<Book> findByIsbnContainingIgnoreCase(String isbn, Pageable pageable);
    Page<Book> findByAuthorNameContainingIgnoreCase(String authorName, Pageable pageable);
    Optional<Book> findById(Long id);
}
