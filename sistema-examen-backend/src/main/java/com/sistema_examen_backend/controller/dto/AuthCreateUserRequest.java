package com.sistema_examen_backend.controller.dto;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record AuthCreateUserRequest(@NotBlank String username,
                                    @NotBlank String password,
                                    @NotBlank String name,
                                    @NotBlank String lastName,
                                    @Email String email,
                                    String phone,
                                    String role) {
}