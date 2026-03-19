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
            // 1. Yazarları Oluşturuyoruz
            Author dostoyevski = authorRepository.save(new Author(null, "Fyodor Dostoyevski"));
            Author stefanZweig = authorRepository.save(new Author(null, "Stefan Zweig"));
            Author sabahattinAli = authorRepository.save(new Author(null, "Sabahattin Ali"));
            Author georgeOrwell = authorRepository.save(new Author(null, "George Orwell"));
            Author franzKafka = authorRepository.save(new Author(null, "Franz Kafka"));
            Author yasarKemal = authorRepository.save(new Author(null, "Yaşar Kemal"));

            // 2. Bir Test Kullanıcısı Oluşturuyoruz
            User user1 = new User();
            user1.setEmail("emrgndz@outlook.com");
            user1.setUsername("themrgndz");
            user1.setPassword("12345");
            user1.setFirstName("Emre");
            user1.setLastName("Gündüz");
            userRepository.save(user1);

            // 3. Kitapları Raflara Diziyoruz

            saveBook("Suç ve Ceza", "Türkçe", "9789750719324", 15,
                    "Raskolnikov'un vicdan azabı ve toplumsal sorgulamaları üzerine bir başyapıt.", dostoyevski, "/book-covers/suc-ve-ceza.jpeg", bookRepository);

            saveBook("Satranç", "Türkçe", "9786053323037", 22,
                    "İnsan ruhunun derinliklerine inen, psikolojik bir gerilim öyküsü.", stefanZweig, "/book-covers/satranç.jpeg", bookRepository);

            saveBook("Kürk Mantolu Madonna", "Türkçe", "9789753631624", 0, // Tükendi testi için 0 stok
                    "Raif Efendi ve Maria Puder'in Berlin'deki unutulmaz ve hüzünlü hikayesi.", sabahattinAli, "/book-covers/kürk-mantolu-madonna.jpeg", bookRepository);

            saveBook("1984", "Türkçe", "9789750719386", 12,
                    "Büyük Birader sizi izliyor! Distopik dünyanın en sarsıcı romanı.", georgeOrwell, "/book-covers/1984.jpeg", bookRepository);

            saveBook("Dönüşüm", "Türkçe", "9786053320142", 5,
                    "Gregor Samsa bir sabah uyandığında kendini dev bir böceğe dönüşmüş buldu.", franzKafka, "/book-covers/dönüşüm.jpeg", bookRepository);

            saveBook("İnce Memed", "Türkçe", "9789750807145", 8,
                    "Toroslar'dan yükselen bir isyanın ve haksızlığa başkaldırının destanı.", yasarKemal, "/book-covers/ince-memed.jpeg", bookRepository);

            saveBook("Olağanüstü Bir Gece", "Türkçe", "9786053326045", 18,
                    "Seçkin bir burjuvanın hayatının bir gecede nasıl değiştiğini anlatan etkileyici bir eser.", stefanZweig, "/book-covers/olağan-üstü-bir-gece.jpeg", bookRepository);

            saveBook("Hayvan Çiftliği", "Türkçe", "9789750719393", 10,
                    "Tüm hayvanlar eşittir ama bazıları daha eşittir.", georgeOrwell, "/book-covers/hayvan-ciftliği.jpeg", bookRepository);

            saveBook("Kuyucaklı Yusuf", "Türkçe", "9789753631419", 6,
                    "Türk edebiyatının en güçlü Anadolu tasvirlerinden biri.", sabahattinAli, "/book-covers/kuyucaklı-yusuf.jpeg", bookRepository);

            System.out.println("Gerçek kitaplar ve yazarlar başarıyla sisteme yüklendi!");
        };
    }

    // Kod tekrarını önlemek için yardımcı metod
    private void saveBook(String title, String lang, String isbn, int stock, String desc, Author author, String imgUrl, IBookRepository repo) {
        Book book = new Book();
        book.setTitle(title);
        book.setLanguage(lang);
        book.setIsbn(isbn);
        book.setStock(stock);
        book.setDescription(desc);
        book.setPublishDate(LocalDate.now());
        book.setAuthor(author);
        book.setImageUrl(imgUrl); // URL'leri frontend tarafında sen ekleyeceğin için şimdilik boş gönderiyoruz
        repo.save(book);
    }
}