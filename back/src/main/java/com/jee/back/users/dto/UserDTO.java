package com.jee.back.users.dto;

import com.jee.back.users.Role;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserDTO {
    private Long id;
    private String image;
    private String email;
    private String name;
    private String password;
    private boolean verified;
    private Role role;
    private String provider;
}
