package com.Library.LibraryApp.Controller;

import com.Library.LibraryApp.Model.User;
import com.Library.LibraryApp.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public String register(@RequestBody User user) {
        if (userService.findByEmail(user.getEmail()) != null) {
            return "Bu e-posta zaten kullanımda";
        }
        userService.saveUser(user);
        return "Kayıt başarılı!";
    }

    @PostMapping("/login")
    public User login(@RequestBody User loginRequest) {
        User user = userService.findByEmail(loginRequest.getEmail());
        if (user != null && user.getPassword().equals(loginRequest.getPassword())) {
            return user;
        }
        return null;
    }
}
