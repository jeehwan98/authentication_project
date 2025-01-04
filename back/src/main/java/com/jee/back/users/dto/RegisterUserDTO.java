package com.jee.back.users.dto;

import com.jee.back.users.Role;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class RegisterUserDTO {
    private Long id;
    private String email;
    private String password;
    private boolean verified;
    private String name;
    private Role role;
    private String image;
    private String provider;
}
