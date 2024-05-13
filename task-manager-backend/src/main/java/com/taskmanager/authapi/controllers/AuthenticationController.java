package com.taskmanager.authapi.controllers;

import com.taskmanager.authapi.models.User;
import com.taskmanager.authapi.dtos.LoginUserDto;
import com.taskmanager.authapi.dtos.RegisterUserDto;
import com.taskmanager.authapi.responses.LoginResponse;
import com.taskmanager.authapi.services.AuthenticationService;
import com.taskmanager.authapi.services.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

/**
 * 
 * @author Sweta Pramanik
 *
 */

@RequestMapping("/api/auth")
@RestController
public class AuthenticationController {
    private final JwtService jwtService;
    private final AuthenticationService authenticationService;

    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/signup")
    public ResponseEntity<User> register(@RequestBody RegisterUserDto registerUserDto) {
        User registeredUser = authenticationService.signup(registerUserDto);
        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDto loginUserDto) {
        return authenticationService.authenticate(loginUserDto);
    }
}