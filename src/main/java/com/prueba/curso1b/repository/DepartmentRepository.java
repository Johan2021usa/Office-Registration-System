package com.prueba.curso1b.repository;


import com.prueba.curso1b.model.Department;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentRepository extends JpaRepository<Department,Long>{

    }
