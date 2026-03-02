package com.Library.LibraryApp;

import com.Library.LibraryApp.Model.Author;
import com.Library.LibraryApp.Model.Book;
import com.Library.LibraryApp.Model.User;
import com.Library.LibraryApp.Repository.IAuthorRepository;
import com.Library.LibraryApp.Repository.IBookRepository;
import com.Library.LibraryApp.Repository.IUserRepository;
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
    public CommandLineRunner loadData(IAuthorRepository authorRepository, IBookRepository bookRepository, IUserRepository userRepository) {
        return args -> {

            Author author1 = new Author();
            author1.setName("Emre GÜNDÜZ");
            authorRepository.save(author1);

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
            book2.setTitle("Python'ın Gizemleri");
            book2.setLanguage("Türkçe");
            book2.setPublishDate(LocalDate.of(2018, 10, 12));
            book2.setIsbn("978-3-16-148410-0");
            book2.setStock(12);
            book2.setDescription("Spring Boot ve React ile kütüphane projesi geliştiriyoruz.");
            book2.setImageUrl("https://via.placeholder.com/150");
            book2.setAuthor(author1);

            bookRepository.save(book1);
            bookRepository.save(book2);

            User user1 = new User();
            user1.setEmail("emrgndz@outlook.com");
            user1.setUsername("themrgndz");
            user1.setPassword("12345");
            user1.setFirstName("Emre");
            user1.setLastName("Gunduz");
            userRepository.save(user1);

            System.out.println("Veritabanı rafları dolduruldu brom!");
        };
    }
}