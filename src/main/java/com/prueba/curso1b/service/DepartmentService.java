package com.prueba.curso1b.service;

import com.prueba.curso1b.model.Department;

import java.util.List;

public interface DepartmentService {

    //Method designed to (GET ALL Departments), this has to be implemented into DepartmentServiceImpl
    //it isn't mandatory put abstract but its put in order to show that it's an abstract method.
    public abstract List<Department> getAllDepartments();
}
