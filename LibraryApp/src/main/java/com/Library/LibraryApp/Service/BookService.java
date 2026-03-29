package com.Library.LibraryApp.Service;

import com.Library.LibraryApp.Model.Book;
import com.Library.LibraryApp.Model.Checkout;
import com.Library.LibraryApp.Repository.IBookRepository;
import com.Library.LibraryApp.Repository.ICheckoutRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class BookService {
    private final IBookRepository bookRepository;
    private final ICheckoutRepository checkoutRepository; // 1. BURASI EKLENDİ: Repo enjekte edildi

    public Page<Book> getAllBooks(Pageable pageable) {
        return bookRepository.findAll(pageable);
    }

    public Book getBookById(Long id){
        return bookRepository.findById(id).orElse(null);
    }

    public Page<Book> searchBooks(String query, Pageable pageable) {
        return bookRepository.findByTitleContainingIgnoreCaseOrIsbnContainingIgnoreCase(query, query, pageable);
    }

    @Transactional
    public Book checkoutBook(String userEmail, Long bookId) {
        // 2. KONTROL: Kullanıcı bu kitabı zaten almış mı?
        Checkout existingCheckout = checkoutRepository.findByUserEmailAndBookId(userEmail, bookId);
        if (existingCheckout != null) {
            throw new RuntimeException("Bu kitabı zaten ödünç almışsınız.");
        }

        // 3. Kitap ve Stok kontrolü
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Kitap bulunamadı"));

        if (book.getStock() <= 0) {
            throw new RuntimeException("Kitap stokta kalmamış.");
        }

        // 4. Stoktan düş
        book.setStock(book.getStock() - 1);
        bookRepository.save(book);

        // 5. Checkout kaydı oluştur ve kaydet
        Checkout checkout = new Checkout();
        checkout.setUserEmail(userEmail);
        checkout.setBookId(bookId);
        checkout.setCheckoutDate(LocalDate.now());

        // DİKKAT: ICheckoutRepository.save değil, değişken ismi olan checkoutRepository.save
        checkoutRepository.save(checkout);

        return book;
    }

    @Transactional
    public Book returnBook(Long bookId) {
        // İade mantığını da ileride Checkout tablosundan silme yapacak şekilde güncelleyebiliriz
        Book book = getBookById(bookId);
        if (book != null) {
            book.setStock(book.getStock() + 1);
            return bookRepository.save(book);
        }
        return book;
    }
}