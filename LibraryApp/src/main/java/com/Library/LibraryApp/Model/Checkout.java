package com.Library.LibraryApp.Model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table(name = "checkout")
@Data
public class Checkout {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userEmail; // Kimin aldığını takip etmek için
    private Long bookId;      // Hangi kitabı aldığını takip etmek için
    private LocalDate checkoutDate;
}