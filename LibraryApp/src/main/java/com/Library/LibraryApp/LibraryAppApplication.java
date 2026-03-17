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
    public CommandLineRunner loadData(IAuthorRepository authorRepository,
                                      IBookRepository bookRepository,
                                      IUserRepository userRepository) {
        return args -> {
            // Bir tane yazar oluşturalım (Hepsine aynı yazarı bağlayabiliriz test için)
            Author author1 = new Author();
            author1.setName("Emre GÜNDÜZ");
            authorRepository.save(author1);

            // Bir tane kullanıcı
            User user1 = new User();
            user1.setEmail("emrgndz@outlook.com");
            user1.setUsername("themrgndz");
            user1.setPassword("12345");
            user1.setFirstName("Emre");
            user1.setLastName("Gunduz");
            userRepository.save(user1);

            // DÖNGÜ: 25 tane kitap oluşturup kaydedelim
            for (int i = 1; i <= 25; i++) {
                Book book = new Book();
                book.setTitle("Kütüphane Kitabı #" + i);
                book.setLanguage("Türkçe");
                book.setPublishDate(LocalDate.now());
                book.setIsbn("ISBN-000-" + i);
                book.setStock(10 + i);
                book.setDescription(i + ". kitabın açıklaması burada yer alıyor.");
                book.setImageUrl("https://via.placeholder.com/150");
                book.setAuthor(author1);

                bookRepository.save(book);
            }

            System.out.println("25 kitap ve 1 kullanıcı başarıyla raflara dizildi brom!");
        };
    }
}