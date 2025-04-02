package com.jee.back.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Table(name = "users")
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
    private String provider;
    @Enumerated(EnumType.STRING)
    private Role role;
    private LocalDateTime createdAt;

    public User(String email, String name, String image) {
        this.email = email;
        this.name = name;
        this.image = image;
        this.role = Role.USER;
        this.createdAt = LocalDateTime.now();
    }
}
