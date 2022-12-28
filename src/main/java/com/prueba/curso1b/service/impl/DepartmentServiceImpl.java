package com.prueba.curso1b.service.impl;

import com.prueba.curso1b.exception.ResourceNotFoundException;
import com.prueba.curso1b.model.Department;
import com.prueba.curso1b.model.Employee;
import com.prueba.curso1b.repository.DepartmentRepository;
import com.prueba.curso1b.service.DepartmentService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentServiceImpl implements DepartmentService {

    //dependency injection not autowired necessary for this class.
    private DepartmentRepository departmentRepository;

    public DepartmentServiceImpl(DepartmentRepository repository) {
        super();
        this.departmentRepository = repository;
    }

    ////////////////Methods implementation///////////////
    //Implement Get all departments method
    @Override
    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    //Implementation of Saving Department method
    @Override
    public Department saveDepartment(Department department){
        return departmentRepository.save(department);
    }

    //Implementation of GetDepartmentById method
    @Override
    public Department getDepartmentById(Long id){
//        return departmentRepository.findById(id).orElse(null);
        return  departmentRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Department", "ID", id));
    }

    //Implementation of Delete Department method
    @Override
    public void deleteDepartment(long id){
        departmentRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Department", "ID", id));
        departmentRepository.deleteById(id);
    }

    //Implementation of UpdateEmployee Method
    @Override
    public Department updateDepartment(Department department, long id){
        Department foundDepartment = departmentRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Department", "ID", id));
        foundDepartment.setIdDep(department.getIdDep());
        foundDepartment.setDepartmentName(department.getDepartmentName());
        foundDepartment.setDepartmentSalary(department.getDepartmentSalary());
        foundDepartment.setDepartmentLevel(department.getDepartmentLevel());
        departmentRepository.save(foundDepartment);
        return foundDepartment;
    }

}
