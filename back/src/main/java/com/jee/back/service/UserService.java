package com.jee.back.service;

import com.jee.back.dto.LoginDTO;
import com.jee.back.entity.Role;
import com.jee.back.entity.User;
import com.jee.back.dto.RegisterUserDTO;
import com.jee.back.dto.UserResponseDTO;
import com.jee.back.repository.UserRepository;
import com.jee.back.util.PasswordUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;

    HashMap<String, Object> responseMap = new HashMap<>();

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("user not found with email: " + email));
    }
    @Transactional
    public UserResponseDTO registerUser(@Valid RegisterUserDTO registerUserDTO) {
        registerUserDTO.setRole(Role.USER);
        registerUserDTO.setPassword((PasswordUtil.hashPassword(registerUserDTO.getPassword())));
        User user = modelMapper.map(registerUserDTO, User.class);
        user = userRepository.save(user);
        return modelMapper.map(user, UserResponseDTO.class);
    }



    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public HashMap<String, Object> login(LoginDTO loginDTO) {
        User user = getUserByEmail(loginDTO.getEmail());

        if (user.getPassword() == null) {
            responseMap.put("error", "This email is already registered. Please log in using GitHub.");
            return responseMap;
        }

        boolean passwordCheck = checkPassword(user, loginDTO.getPassword());

        UserResponseDTO response = modelMapper.map(user, UserResponseDTO.class);
        responseMap.put("user", response);
        return responseMap;
    }

    public boolean checkPassword(User user, String inputtedPassword) {
        if (!passwordEncoder.matches(inputtedPassword, user.getPassword())) {
            return false;
        }

        return true;
    }
}
