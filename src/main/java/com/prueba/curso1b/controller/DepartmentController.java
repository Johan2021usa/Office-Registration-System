package com.prueba.curso1b.controller;

import com.prueba.curso1b.model.Department;
import com.prueba.curso1b.service.DepartmentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping({"/api/departments"})
public class DepartmentController {

    //Dependency injection
    private DepartmentService departmentService;

    public DepartmentController(DepartmentService departmentService) {
        super();
        this.departmentService = departmentService;
    }

    //Build GET ALL Departments (REST API)
    @GetMapping
   public List<Department> getAllDepartments(){
        return  departmentService.getAllDepartments();
    }

    //Build Save Department (REST API)
    @PostMapping
    public ResponseEntity<Department> saveDepartment(@RequestBody Department department){
        return new ResponseEntity<Department>(departmentService.saveDepartment(department), HttpStatus.CREATED);
    }
}
