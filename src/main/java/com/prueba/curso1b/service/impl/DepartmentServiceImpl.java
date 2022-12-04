package com.prueba.curso1b.service.impl;

import com.prueba.curso1b.model.Department;
import com.prueba.curso1b.repository.DepartmentRepository;
import com.prueba.curso1b.service.DepartmentService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentServiceImpl implements DepartmentService {

    //dependency injection not autowired necessary for this class.
    private DepartmentRepository DepartmentRepository;

    public DepartmentServiceImpl(DepartmentRepository repository) {
        super();
        this.DepartmentRepository = repository;
    }

    ////////////////Methods implementation///////////////
    //Implement Get all departments method
    @Override
    public List<Department> getAllDepartments() {
        return DepartmentRepository.findAll();
    }

    //Implementation of Saving Department method
    @Override
    public Department saveDepartment(Department department){
        return DepartmentRepository.save(department);
    }


}
