package com.sistema_examen_backend.service.impl;

import com.sistema_examen_backend.controller.dto.AuthCreateUserRequest;
import com.sistema_examen_backend.persistence.entity.RoleEntity;
import com.sistema_examen_backend.persistence.entity.RoleEnum;
import com.sistema_examen_backend.persistence.entity.UserEntity;
import com.sistema_examen_backend.persistence.repository.RoleRepository;
import com.sistema_examen_backend.persistence.repository.UserRepository;
import com.sistema_examen_backend.service.interfaces.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class UserServiceImpl implements IUserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;



    @Override
    public UserEntity saveUser(AuthCreateUserRequest request) throws Exception {


        if (userRepository.findByUsername(request.username()) != null) {
            throw new Exception("El usuario ya existe");
        }

        UserEntity user = new UserEntity();
        user.setUsername(request.username());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setName(request.name());
        user.setLastName(request.lastName());
        user.setEmail(request.email());
        user.setPhone(request.phone());
        user.setEnabled(true);

        RoleEnum roleEnum;
        try {
            roleEnum = RoleEnum.valueOf(request.role().toUpperCase());
        } catch (IllegalArgumentException ex) {
            throw new Exception("Rol inválido: " + request.role());
        }

        RoleEntity role = roleRepository.findByRoleEnum(roleEnum);
        if (role == null) {
            throw new Exception("El rol '" + roleEnum.name() + "' no está definido en la base de datos.");
        }

        user.getRoles().add(role);

        return userRepository.save(user);
    }

    @Override
    public UserEntity getUser(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }
}
