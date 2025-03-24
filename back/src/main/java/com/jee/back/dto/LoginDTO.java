package com.jee.back.dto;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginDTO {
    private String email;
    private String password;
}
