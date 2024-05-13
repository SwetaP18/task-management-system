package com.taskmanager.authapi.services;

import com.taskmanager.authapi.dtos.LoginUserDto;
import com.taskmanager.authapi.dtos.RegisterUserDto;
import com.taskmanager.authapi.models.User;
import com.taskmanager.authapi.repositories.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.taskmanager.authapi.responses.LoginResponse;
import com.taskmanager.authapi.services.JwtService;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import java.util.ArrayList;
import java.util.List;
import org.springframework.security.core.AuthenticationException;
import org.springframework.http.ResponseEntity;


@Service
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthenticationService(
        UserRepository userRepository,
        AuthenticationManager authenticationManager,
        PasswordEncoder passwordEncoder,
        JwtService jwtService
    ) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public User signup(RegisterUserDto input) {
        System.out.print("Service ==============================================> "+input.getEmail());

        User user = new User()
            .setFullName(input.getFullName())
            .setEmail(input.getEmail())
            .setUsername(input.getEmail())
            .setPassword(passwordEncoder.encode(input.getPassword()));

        return userRepository.save(user);
    }

    public ResponseEntity<LoginResponse> authenticate(LoginUserDto loginUserDto) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginUserDto.getEmail(), loginUserDto.getPassword())
            );
            User user = userRepository.findByEmail(loginUserDto.getEmail()).orElse(null);
            if (user == null) {
                return new ResponseEntity<LoginResponse>(new LoginResponse(null, 0L, "Invalid email or password"), HttpStatus.UNAUTHORIZED);
            }
            String token = jwtService.generateToken(user);
            long expiresIn = jwtService.getExpirationTime();
            return ResponseEntity.ok(new LoginResponse(token, expiresIn, "Login successful"));
        } catch (AuthenticationException e) {
            return new ResponseEntity<LoginResponse>(new LoginResponse(null, 0L, "Authentication failed: " + e.getMessage()), HttpStatus.UNAUTHORIZED);
        }
    }

    public List<User> allUsers() {
        List<User> users = new ArrayList<>();

        userRepository.findAll().forEach(users::add);

        return users;
    }
}
