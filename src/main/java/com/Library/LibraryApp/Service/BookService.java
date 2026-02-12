package com.Library.LibraryApp.Service;

import com.Library.LibraryApp.Model.Book;
import com.Library.LibraryApp.Repository.IBookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookService {
    private final IBookRepository bookRepository;
    public List<Book> searchBooks(String query, String type) {
        if ("title".equalsIgnoreCase(type)) {
            return bookRepository.findByTitleContainingIgnoreCase(query);
        } else if ("isbn".equalsIgnoreCase(type)) {
            return bookRepository.findByIsbnContainingIgnoreCase(query);
        } else if ("author".equalsIgnoreCase(type)) {
            return bookRepository.findByAuthorNameContainingIgnoreCase(query);
        } else {
            return bookRepository.findByTitleContainingIgnoreCaseOrIsbnContainingIgnoreCase(query, query);
        }
    }
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }
    public Book GetBookById(Long id){
        return bookRepository.findById(id).orElse(null);
    }
}
