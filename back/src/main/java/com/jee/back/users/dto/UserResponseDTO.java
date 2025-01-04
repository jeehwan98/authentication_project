package com.jee.back.users.dto;

import com.jee.back.users.Role;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserResponseDTO {
    private String email;
    private Role role;
    private String image;
    private String name;
}
