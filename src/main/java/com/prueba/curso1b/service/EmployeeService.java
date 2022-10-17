package com.prueba.curso1b.service;

import com.prueba.curso1b.model.Employee;

import java.util.List;

public interface EmployeeService {

    //Method designed to (SAVE OR CREATE) an employee, this needs to be implemented inside EmployeeServiceImpl
    Employee saveEmployee(Employee employee);//Postman sends a JSON with an employee's parameters.

    //Method designed to (GET ALL EMPLOYEES), it needs to be implemented inside EmployeeServiceImpl
    List<Employee> getAllEmployees(); // Post man receive all employee and parameters registered in the database.

    //Method designed to (GET AN EMPLOYEE BY ID), it needs to be implemented in EmployeeServiceImpl
    Employee getEmployeeById(Long id); //Postman sends an id to get a specific employee and his parameters.

    //Method designed to (Update an Employee), it needs to be implemented in EmployeeServiceImpl
    Employee updateEmployee(Employee employee, long id);

    //Method designed to (delete an employee), it requires to be implemented in EmployeeServiceImpl
    void deleteEmployee(long id);


}
