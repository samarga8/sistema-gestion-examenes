package com.sistema_examen_backend;

import com.sistema_examen_backend.persistence.entity.RoleEntity;
import com.sistema_examen_backend.persistence.entity.RoleEnum;
import com.sistema_examen_backend.persistence.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Arrays;

@SpringBootApplication
public class SistemaExamenBackendApplication implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

	public static void main(String[] args) {
		SpringApplication.run(SistemaExamenBackendApplication.class, args);
	}

    @Override
    public void run(String... args) throws Exception {
        Arrays.stream(RoleEnum.values()).forEach(roleEnum -> {
            RoleEntity existingRole = roleRepository.findByRoleEnum(roleEnum);
            if (existingRole == null) {
                RoleEntity newRole = new RoleEntity();
                newRole.setRoleEnum(roleEnum);
                roleRepository.save(newRole);
                System.out.println("Rol creado: " + roleEnum.name());
            }
        });
    }
}
