package com.jee.back.dto;

import com.jee.back.entity.Role;
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
