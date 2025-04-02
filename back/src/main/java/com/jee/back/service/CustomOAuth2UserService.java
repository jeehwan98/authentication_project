package com.jee.back.service;

import com.jee.back.entity.User;
import com.jee.back.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Log4j2
@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {
    private final UserRepository userRepository;
    private final RestTemplate restTemplate;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        String name = oAuth2User.getAttribute("name");
        String image = oAuth2User.getAttribute("avatar_url");
        // String bio = oAuth2User.getAttribute("bio");
        String githubId = oAuth2User.getAttribute("id").toString();
        String email = oAuth2User.getAttribute("email"); // we have to get the email by calling another URL

        if (email == null) {
            String accessToken = userRequest.getAccessToken().getTokenValue();
            email = fetchEmailFromGitHub(accessToken);
        }

        if (userRepository.findByEmail(email).isEmpty()) {
            User user = new User(email, name, image);
            userRepository.save(user);
            log.info("New user saved: " + name);
        } else {
            log.info("User already exists: " + name);
        }

        Map<String, Object> attributes = new HashMap<>(oAuth2User.getAttributes());
        attributes.put("email", email);

        // reuse existing authorities, updating the attributes with email, and setting the email with the principal name attribute
        return new DefaultOAuth2User(
                oAuth2User.getAuthorities(),
                attributes,
                "email"
        );
    }

    private String fetchEmailFromGitHub(String accessToken) {
        String url = "https://api.github.com/user/emails";
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<List<Map<String, Object>>> response = restTemplate.exchange(
                url, HttpMethod.GET, entity, new ParameterizedTypeReference<List<Map<String, Object>>>() {}
        );

        if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
            for (Map<String, Object> emailData : response.getBody()) {
                if (Boolean.TRUE.equals(emailData.get("primary")) && Boolean.TRUE.equals(emailData.get("verified"))) {
                    return (String) emailData.get("email");
                }
            }
            // Fallback to first email if no primary/verified email is found
            return response.getBody().isEmpty() ? null : (String) response.getBody().get(0).get("email");
        }

        log.warn("Failed to fetch email from GitHub: {}", response.getStatusCode());
        return null;
    }
}
