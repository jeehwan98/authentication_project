package com.jee.back.users.service;

import com.jee.approuterauthusingnextauthback.users.Role;
import com.jee.approuterauthusingnextauthback.users.User;
import com.jee.back.users.dto.RegisterUserDTO;
import com.jee.back.users.dto.UserResponseDTO;
import com.jee.back.users.repository.UserRepository;
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
        User user = modelMapper.map(registerUserDTO, User.class);
        user = userRepository.save(user);
        return modelMapper.map(user, UserResponseDTO.class);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
