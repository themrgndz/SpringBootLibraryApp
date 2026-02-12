package com.Library.LibraryApp.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.Library.LibraryApp.Model.Book;
import com.Library.LibraryApp.Service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/books")
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;

    // 1. Tüm kitapları getirme ve Arama yapma (GET /api/books)
    @GetMapping
    public List<Book> getBooks(@RequestParam(required = false) String query,
                               @RequestParam(required = false) String type) {
        if (query != null && !query.trim().isEmpty()) {
            return bookService.searchBooks(query, type);
        }else{
            return bookService.getAllBooks();
        }
    }

    // 2. Tek bir kitabı ID ile getirme (GET /api/books/1)
    @GetMapping("/{id}")
    public Book getBookById(@PathVariable Long id) {
        return bookService.GetBookById(id);
    }
}