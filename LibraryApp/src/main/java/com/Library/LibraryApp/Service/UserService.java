package com.Library.LibraryApp.Service;

import com.Library.LibraryApp.Model.User;
import com.Library.LibraryApp.Repository.IUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final IUserRepository userRepository;

    public void saveUser(User user) {
        userRepository.save(user);
    }
    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }
    public User findById(Long id){
        return userRepository.findById(id).orElse(null);
    }
}