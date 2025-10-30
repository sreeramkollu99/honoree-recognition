package com.honorhub.honorhub_backend.service;

import com.honorhub.honorhub_backend.dto.AuthResponse;
import com.honorhub.honorhub_backend.dto.LoginRequest;
import com.honorhub.honorhub_backend.dto.RegisterRequest;
import com.honorhub.honorhub_backend.model.Role;
import com.honorhub.honorhub_backend.model.User;
import com.honorhub.honorhub_backend.repository.UserRepository;
import com.honorhub.honorhub_backend.security.JwtUtil;
import lombok.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public void register(RegisterRequest req) {
        userRepository.findByEmail(req.getEmail()).ifPresent(u -> {
            throw new RuntimeException("User already exists");
        });
        User u = new User();
        u.setEmail(req.getEmail());
        u.setPassword(passwordEncoder.encode(req.getPassword()));
        Role role = Role.valueOf(req.getRole().toUpperCase());
        u.setRole(role);
        userRepository.save(u);
    }

    public AuthResponse login(LoginRequest req) {
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword())
        );
        String token = jwtUtil.generateToken(auth.getName());
        User user = userRepository.findByEmail(auth.getName()).orElseThrow();
        return new AuthResponse(token, user.getEmail(), user.getRole().name());
    }
}