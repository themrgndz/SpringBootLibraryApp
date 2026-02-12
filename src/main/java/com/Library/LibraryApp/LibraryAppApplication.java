package com.Library.LibraryApp;

import com.Library.LibraryApp.Model.Author;
import com.Library.LibraryApp.Model.Book;
import com.Library.LibraryApp.Repository.IAuthorRepository;
import com.Library.LibraryApp.Repository.IBookRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;

@SpringBootApplication
public class LibraryAppApplication {

    public static void main(String[] args) {
        SpringApplication.run(LibraryAppApplication.class, args);
    }
    @Bean
    public CommandLineRunner loadData(IAuthorRepository authorRepository, IBookRepository bookRepository) {
        return args -> {

            // 1. Önce Yazarı Oluşturuyoruz
            Author author1 = new Author();
            author1.setName("Emre GÜNDÜZ");
            authorRepository.save(author1);

            // 2. Sonra Kitabı Oluşturup Yazara Bağlıyoruz
            Book book1 = new Book();
            book1.setTitle("Java'nın Gizemleri");
            book1.setLanguage("Türkçe");
            book1.setPublishDate(LocalDate.of(2018, 10, 12));
            book1.setIsbn("978-3-16-148410-0");
            book1.setStock(12);
            book1.setDescription("Spring Boot ve React ile kütüphane projesi geliştiriyoruz.");
            book1.setImageUrl("https://via.placeholder.com/150");
            book1.setAuthor(author1);

            Book book2 = new Book();
            book2.setTitle("Java'nın Gizemleri");
            book2.setLanguage("Türkçe");
            book2.setPublishDate(LocalDate.of(2018, 10, 12));
            book2.setIsbn("978-3-16-148410-0");
            book2.setStock(12);
            book2.setDescription("Spring Boot ve React ile kütüphane projesi geliştiriyoruz.");
            book2.setImageUrl("https://via.placeholder.com/150");
            book2.setAuthor(author1);

            bookRepository.save(book1);
            bookRepository.save(book2);

            System.out.println("Veritabanı rafları dolduruldu brom!");
        };
    }
}