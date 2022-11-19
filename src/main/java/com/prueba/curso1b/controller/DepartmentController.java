package com.prueba.curso1b.controller;

import com.prueba.curso1b.model.Department;
import com.prueba.curso1b.service.DepartmentService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
