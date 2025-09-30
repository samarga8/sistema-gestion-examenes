package com.sistema_examen_backend.controller;

import com.sistema_examen_backend.controller.dto.AuthCreateUserRequest;
import com.sistema_examen_backend.persistence.entity.RoleEntity;
import com.sistema_examen_backend.persistence.entity.RoleEnum;
import com.sistema_examen_backend.persistence.entity.UserEntity;
import com.sistema_examen_backend.service.interfaces.IUserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private IUserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;



    @PostMapping("sign-up")
    public ResponseEntity<?> saveUser(@RequestBody AuthCreateUserRequest user) throws Exception{
        try {
            UserEntity userEntity = userService.saveUser(user);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

    }


    @GetMapping("/{username}")
    public UserEntity getUser(@PathVariable("username") String username){
        return userService.getUser(username);
    }

    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable("userId") Long userId){
        userService.deleteUser(userId);
    }

}