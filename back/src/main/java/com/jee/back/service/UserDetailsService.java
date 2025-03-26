package com.jee.back.service;

import com.jee.back.entity.User;
import com.jee.back.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {
    private final UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> userInfo = userRepository.findByEmail(username);
        if (userInfo.isEmpty()) {
            throw new UsernameNotFoundException(username);
        }
        User user = userInfo.get();

        return new UserDetailsImpl(user);
    }
}
