package com.jee.back.service;

import com.jee.back.constant.ERROR_MESSAGE;
import com.jee.back.constant.SUCCESS_MESSAGE;
import com.jee.back.dto.*;
import com.jee.back.entity.Role;
import com.jee.back.entity.User;
import com.jee.back.repository.UserRepository;
import com.jee.back.util.CookieUtil;
import com.jee.back.util.JwtTokenUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;
    private final UserDetailsService userDetailsService;
    private final JwtTokenUtil jwtTokenUtil;
    private final CookieUtil cookieUtil;

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException(ERROR_MESSAGE.USER_NOT_FOUND + email));
    }

    public ApiResponse<LoginResponse> login(LoginDTO loginDTO,
                                            HttpServletRequest request,
                                            HttpServletResponse response) {
        Optional<User> user = userRepository.findByEmail(loginDTO.getEmail());

        if (user.isEmpty()) {
            return ApiResponse.failure("email", ERROR_MESSAGE.INVALID_USER);
        }

        if (!checkPassword(user.get(), loginDTO.getPassword())) {
            return ApiResponse.failure("password", ERROR_MESSAGE.INVALID_PASSWORD);
        }

        UserResponse userResponse = modelMapper.map(user.get(), UserResponse.class);

        // set credentials to contextHolder and cookies
        setContextCredentials(user.get(), request);
        cookieUtil.createCookies(response, user.get());

        LoginResponse loginResponse = new LoginResponse(
                userResponse,
                jwtTokenUtil.generateAccessToken(user.get()),
                jwtTokenUtil.generateRefreshToken(user.get())
        );
        return ApiResponse.success(SUCCESS_MESSAGE.LOGIN, loginResponse);
    }

    @Transactional
    public ApiResponse register(@Valid RegisterUserDTO registerUserDTO) {
        Optional<User> existingUser = userRepository.findByEmail(registerUserDTO.getEmail());
        if (existingUser.isPresent()) {
            return ApiResponse.failure("email", ERROR_MESSAGE.EMAIL_EXISTS);
        }

        User user = registerUser(registerUserDTO);
        userRepository.save(user);

        return ApiResponse.success(SUCCESS_MESSAGE.REGISTRATION, null);
    }

    public boolean checkPassword(User user, String inputtedPassword) {
        if (!passwordEncoder.matches(inputtedPassword, user.getPassword())) return false;
        return true;
    }

    /** set logged in user to securityContextHolder */
    private void setContextCredentials(User user, HttpServletRequest request) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                userDetails,
                null,
                userDetails.getAuthorities()
        );
        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(authToken);
    }

    private User registerUser(RegisterUserDTO registerUserDTO) {
        registerUserDTO.setRole(Role.USER);
        registerUserDTO.setPassword(passwordEncoder.encode(registerUserDTO.getPassword()));
        registerUserDTO.setCreatedAt(LocalDateTime.now());
        return modelMapper.map(registerUserDTO, User.class);
    }
}
