package com.sistema_examen_backend.service.interfaces;

import com.sistema_examen_backend.controller.dto.AuthCreateUserRequest;
import com.sistema_examen_backend.persistence.entity.UserEntity;

import java.util.Set;

public interface IUserService {

     UserEntity saveUser(AuthCreateUserRequest user) throws Exception;

     UserEntity getUser(String username);

      void deleteUser(Long userId);
}
