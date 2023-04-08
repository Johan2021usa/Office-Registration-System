package com.prueba.curso1b.service;

import com.prueba.curso1b.model.Department;

import java.util.List;

public interface DepartmentService {

    //Method designed to (GET ALL Departments), this has to be implemented into DepartmentServiceImpl
    //it isn't mandatory put abstract method, but it's put in order to show that it's an abstract method.
    public abstract List<Department> getAllDepartments();

    //Method (Saved Department) it has to be implemented into DepartmentServiceImpl
    Department saveDepartment(Department department);

    //Method (Get department by id)
    Department getDepartmentById(long id);

    //Method (Delete department)
    void deleteDepartment(long id);

    //Method (Update Department)
    Department updateDepartment(Department department, long id);

}
