package com.jee.back.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;

@Entity
@Getter
@Table(name = "users")
@Data
public class User extends AbstractEntity {
    private String email;
    private String password;
    private String image;
    private String name;
    private boolean verified = false;
    private String provider;
    @Enumerated(EnumType.STRING)
    private Role role;
}
