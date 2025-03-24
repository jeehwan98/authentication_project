package com.jee.back.controller;

import com.jee.back.dto.LoginDTO;
import com.jee.back.entity.User;
import com.jee.back.dto.RegisterUserDTO;
import com.jee.back.dto.UserResponseDTO;
import com.jee.back.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Log4j2
public class AuthController {

    private final UserService userService;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/authenticate")
    public ResponseEntity<Map<String, Object>> authenticateUserGithub(@Valid @RequestBody RegisterUserDTO registerUserDTO) {
        System.out.println("authentication???");
        HashMap<String, Object> responseMap = new HashMap<>();
        Optional<User> existingUser = userService.findByEmail(registerUserDTO.getEmail());
        if (existingUser.isEmpty()) {
            registerUserDTO.setProvider("github");
            UserResponseDTO response = userService.registerUser(registerUserDTO);
            responseMap.put("register", response);
            System.out.println("github 회원가입!" + responseMap);
            return ResponseEntity.status(HttpStatus.CREATED).body(responseMap);
        }

        responseMap.put("login", "login success");
        return ResponseEntity.ok(responseMap);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@Valid @RequestBody LoginDTO loginDTO) {
        HashMap<String, Object> responseMap = new HashMap<>();
        Optional<User> existingUser = userService.findByEmail(loginDTO.getEmail());

        if (existingUser.isEmpty()) {
            responseMap.put("error", "No account found with this email address.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseMap);
        }

        if (existingUser.get().getPassword() == null) {
            responseMap.put("error", "This email is already registered. Please log in using GitHub.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseMap);
        }

        if (!passwordEncoder.matches(loginDTO.getPassword(), existingUser.get().getPassword())) {
            responseMap.put("error", "The password you entered is incorrect.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseMap);
        }

        UserResponseDTO response = modelMapper.map(existingUser.get(), UserResponseDTO.class);
        responseMap.put("user", response);
        return ResponseEntity.ok().body(responseMap);
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@Valid @RequestBody RegisterUserDTO registerUserDTO) {
        System.out.println("registerDTO?: " + registerUserDTO);
        HashMap<String, Object> responseMap = new HashMap<>();
        Optional<User> existingUser = userService.findByEmail(registerUserDTO.getEmail());
        if (existingUser.isPresent()) {
            responseMap.put("error", "Email is already taken");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseMap);
        }
        UserResponseDTO response = userService.registerUser(registerUserDTO);
        System.out.println("response?: " + response);
        responseMap.put("success", response);
        return ResponseEntity.ok(responseMap);
    }
}
