package com.jee.back.service;

import com.jee.back.entity.Role;
import com.jee.back.entity.User;
import com.jee.back.dto.RegisterUserDTO;
import com.jee.back.dto.UserResponseDTO;
import com.jee.back.repository.UserRepository;
import com.jee.back.util.PasswordUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
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
        registerUserDTO.setPassword((PasswordUtil.hashPassword(registerUserDTO.getPassword())));
        User user = modelMapper.map(registerUserDTO, User.class);
        user = userRepository.save(user);
        return modelMapper.map(user, UserResponseDTO.class);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
