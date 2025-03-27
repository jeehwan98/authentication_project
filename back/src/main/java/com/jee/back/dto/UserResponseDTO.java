package com.jee.back.dto;

import com.jee.back.entity.Role;
import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserResponseDTO {
    private int id;
    private String email;
    private Role role;
    private String image;
    private String name;
    private LocalDateTime createdAt;
}
