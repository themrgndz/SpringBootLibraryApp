package com.Library.LibraryApp.Service;
import com.Library.LibraryApp.Model.Book;
import com.Library.LibraryApp.Model.User;
import com.Library.LibraryApp.Repository.IBookRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Service
@RequiredArgsConstructor
public class BookService {
    private final IBookRepository bookRepository;
    private final UserService userService;

    public Page<Book> getAllBooks(Pageable pageable) {
        return bookRepository.findAll(pageable);
    }
    public Book getBookById(Long id){
        return bookRepository.findById(id).orElse(null);
    }
    public Page<Book> searchBooks(String query, String type, Pageable pageable) {
        if ("title".equalsIgnoreCase(type)) {
            return bookRepository.findByTitleContainingIgnoreCase(query, pageable);
        } else if ("isbn".equalsIgnoreCase(type)) {
            return bookRepository.findByIsbnContainingIgnoreCase(query, pageable);
        } else if ("author".equalsIgnoreCase(type)) {
            return bookRepository.findByAuthorNameContainingIgnoreCase(query, pageable);
        } else {
            return bookRepository.findByTitleContainingIgnoreCaseOrIsbnContainingIgnoreCase(query, query, pageable);
        }
    }
    @Transactional public Book checkoutBook(Long userId, Long bookId) {

        // 1. Kitabı bul, yoksa null dön
        Book book = getBookById(bookId);

        // 2. Kullanıcıyı bul, yoksa null dön
        User user = userService.findById(userId);

        // 3. KONTROL: Kitap stokta var mı? Bir kullanıcıya atanmış mı?
        if(book != null && user != null && book.getStock() > 0 && book.getCurrentUser() == null){
            // 5. İŞLEM: Stoğu 1 azalt
            book.setStock(book.getStock()-1);

            // 6. İŞLEM: Kitaba kullanıcıyı ata
            book.setCurrentUser(user);

            // 7. KAYIT: bookRepository.save(book)
            bookRepository.save(book);

            // 8. SONUÇ: Güncel kitabı dön
            return book;
        }
        return book;
    }
    @Transactional public Book returnBook(Long bookId) {
        Book book = getBookById(bookId);
        if (book != null && book.getCurrentUser() != null) {
            book.setCurrentUser(null);
            book.setStock(book.getStock() + 1);
            return bookRepository.save(book);
        }
        return book;
    }
}
