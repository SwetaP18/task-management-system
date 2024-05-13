package com.taskmanager.authapi.responses;

public class LoginResponse {
    private String token;
    private long expiresIn;
    private String message;

    public LoginResponse() {
    }

    public LoginResponse(String token, long expiresIn, String message) {
        this.token = token;
        this.expiresIn = expiresIn;
        this.message = message;
    }

    public String getToken() {
        return token;
    }

    public LoginResponse setToken(String token) {
        this.token = token;
        return this;
    }

    public long getExpiresIn() {
        return expiresIn;
    }

    public LoginResponse setExpiresIn(long expiresIn) {
        this.expiresIn = expiresIn;
        return this;
    }

    public String getMessage() {
        return message;
    }

    public LoginResponse setMessage(String message) {
        this.message = message;
        return this;
    }

    @Override
    public String toString() {
        return "LoginResponse{" +
                "token='" + token + '\'' +
                ", expiresIn=" + expiresIn +
                ", message='" + message + '\'' +
                '}';
    }
}
