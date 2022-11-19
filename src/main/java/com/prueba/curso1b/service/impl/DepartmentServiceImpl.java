package com.prueba.curso1b.service.impl;

import com.prueba.curso1b.model.Department;
import com.prueba.curso1b.repository.DepartmentRepository;
import com.prueba.curso1b.service.DepartmentService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentServiceImpl implements DepartmentService {

    //dependency injection not autowired necessary for this class.
    private DepartmentRepository repository;

    public DepartmentServiceImpl(DepartmentRepository repository) {
        super();
        this.repository = repository;
    }

    //Implement Get all departments method
    @Override
    public List<Department> getAllDepartments() {
        return repository.findAll();
    }
}
