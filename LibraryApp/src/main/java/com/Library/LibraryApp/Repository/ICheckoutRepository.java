package com.Library.LibraryApp.Repository;

import com.Library.LibraryApp.Model.Checkout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ICheckoutRepository extends JpaRepository<Checkout, Long> {
    // Bu metod kullanıcı aynı kitabı tekrar almasın diye lazım
    Checkout findByUserEmailAndBookId(String userEmail, Long bookId);
}