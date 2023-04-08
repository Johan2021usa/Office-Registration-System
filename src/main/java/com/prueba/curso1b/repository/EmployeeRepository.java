package com.prueba.curso1b.repository;

import com.prueba.curso1b.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

// @Repository Annotation is no required because Spring Data JPA internally provides the annotation internally
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

}
