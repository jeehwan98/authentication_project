package com.jee.back.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@Table(name = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String email;
    private String password;
    private String image;
    private String name;
    private boolean verified = false;
    private String provider;
    @Enumerated(EnumType.STRING)
    private Role role;
    private LocalDateTime createdAt;
}
