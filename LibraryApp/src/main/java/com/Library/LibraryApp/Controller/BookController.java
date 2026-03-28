package com.Library.LibraryApp.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.Library.LibraryApp.Model.Book;
import com.Library.LibraryApp.Service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/books")
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;
    // 1. Tüm kitapları getirme ve Arama yapma (GET /api/books)
    @GetMapping
    public Page<Book> getBooks(@RequestParam(defaultValue = "0") int page,
                               @RequestParam(defaultValue = "12") int size, // React tarafıyla uyumlu olması için 12 yaptık
                               @RequestParam(required = false) String query) { // 'type' parametresini sildik

        Pageable pageable = PageRequest.of(page, size);

        if (query != null && !query.trim().isEmpty()) {
            return bookService.searchBooks(query, pageable);
        } else {
            return bookService.getAllBooks(pageable);
        }
    }

    // 2. Tek bir kitabı ID ile getirme (GET /api/books/1)
    @GetMapping("/{id}")
    public Book getBookById(@PathVariable Long id) {
        return bookService.getBookById(id);
    }

    @PutMapping("/checkout")
    public Book checkoutBook(@RequestParam Long userId, @RequestParam Long bookId) {
        return bookService.checkoutBook(userId, bookId);
    }
}