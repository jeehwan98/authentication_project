package com.jee.back.dto;

import com.jee.back.entity.Role;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserDTO {
    private int id;
    private String image;
    private String email;
    private String name;
    private String password;
    private boolean verified;
    private Role role;
    private String provider;
}
