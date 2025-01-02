package com.jee.back.auth.controller;

import com.jee.approuterauthusingnextauthback.auth.dto.LoginDTO;
import com.jee.approuterauthusingnextauthback.users.User;
import com.jee.approuterauthusingnextauthback.users.dto.RegisterUserDTO;
import com.jee.approuterauthusingnextauthback.users.dto.UserDTO;
import com.jee.approuterauthusingnextauthback.users.dto.UserResponseDTO;
import com.jee.approuterauthusingnextauthback.users.service.UserService;
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

    @PostMapping("/authenticate")
    public ResponseEntity<Map<String, Object>> authenticateUserGithub(@Valid @RequestBody RegisterUserDTO registerUserDTO) {
        System.out.println("authentication???");
        HashMap<String, Object> responseMap = new HashMap<>();
        Optional<User> existingUser = userService.findByEmail(registerUserDTO.getEmail());
        if (existingUser.isEmpty()) {
            UserResponseDTO response = userService.registerUser(registerUserDTO);
            responseMap.put("register", response);
            System.out.println("github 회원가입!" + responseMap);
            return ResponseEntity.status(HttpStatus.CREATED).body(responseMap);
        }
        // 존재하면 로그인 logic 적을 것
        /** 존재하면 로그인 logic 작성하고 token 생성해서 return할 것 */
        responseMap.put("login", "login success");
        return ResponseEntity.ok(responseMap);
    }
}
