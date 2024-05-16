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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import javax.validation.Valid;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;

/**
 * 
 * @author Sweta Pramanik
 *
 */

@RequestMapping("/api/auth")
@RestController
@Validated // Enables method-level validation
public class AuthenticationController {
    private final JwtService jwtService;
    private final AuthenticationService authenticationService;
    private static final Logger logger = LoggerFactory.getLogger(AuthenticationController.class);

    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/signup")
    public ResponseEntity<User> register(@Valid @RequestBody RegisterUserDto registerUserDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            // If there are validation errors, return bad request response with error details
            return ResponseEntity.badRequest().build();
        }
        User registeredUser = authenticationService.signup(registerUserDto);
        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@Valid @RequestBody LoginUserDto loginUserDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            // If there are validation errors, return bad request response with error details
            return ResponseEntity.badRequest().build();
        }
        return authenticationService.authenticate(loginUserDto);
    }
}
