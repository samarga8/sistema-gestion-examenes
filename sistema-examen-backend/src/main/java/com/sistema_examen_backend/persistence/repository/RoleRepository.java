package com.sistema_examen_backend.persistence.repository;

import com.sistema_examen_backend.persistence.entity.RoleEntity;
import com.sistema_examen_backend.persistence.entity.RoleEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<RoleEntity,Long> {

    RoleEntity findByRoleEnum(RoleEnum roleEnum);
}
