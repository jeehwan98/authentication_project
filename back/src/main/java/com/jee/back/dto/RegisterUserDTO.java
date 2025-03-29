package com.jee.back.dto;

import com.jee.back.entity.Role;
import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class RegisterUserDTO {
    private Long id;
    private String email;
    private Role role;
    private String password;
    private String name;
    private String image;
    private LocalDateTime createdAt;
}
