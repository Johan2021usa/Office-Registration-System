package com.prueba.curso1b.controller;

import com.prueba.curso1b.model.Department;
import com.prueba.curso1b.service.DepartmentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping({"/api/departments"})
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST,RequestMethod.PUT,RequestMethod.DELETE})
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

    //Build Get Department by id (Rest API)
    @GetMapping("{id}")
    public ResponseEntity<Department> getDepartmentById(@PathVariable("id") long idDepartment){
        return new ResponseEntity<Department>(departmentService.getDepartmentById(idDepartment), HttpStatus.OK);
    }

    //Build Delete department (REST API)
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteDepartment(@PathVariable("id") long idDepartment){
        departmentService.deleteDepartment(idDepartment);
        return new ResponseEntity<String>("Employee deleted successfully", HttpStatus.OK);
    }

    //Build update department (API REST)
    @PutMapping("{id}")
    public ResponseEntity<Department> updateDepartment(@PathVariable("id") long idDepartment, @RequestBody Department department){
        return new ResponseEntity<Department>(departmentService.updateDepartment(department, idDepartment), HttpStatus.OK);
    }
}
