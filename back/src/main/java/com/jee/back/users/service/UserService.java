package com.jee.back.users.service;

import com.jee.back.users.Role;
import com.jee.back.users.User;
import com.jee.back.users.dto.RegisterUserDTO;
import com.jee.back.users.dto.UserResponseDTO;
import com.jee.back.users.repository.UserRepository;
import com.jee.back.utils.PasswordUtils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    @Transactional
    public UserResponseDTO registerUser(@Valid RegisterUserDTO registerUserDTO) {
        registerUserDTO.setRole(Role.USER);
        registerUserDTO.setPassword((PasswordUtils.hashPassword(registerUserDTO.getPassword())));
        User user = modelMapper.map(registerUserDTO, User.class);
        user = userRepository.save(user);
        return modelMapper.map(user, UserResponseDTO.class);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
