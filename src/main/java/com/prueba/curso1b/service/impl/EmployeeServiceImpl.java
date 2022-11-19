package com.prueba.curso1b.service.impl;

import com.prueba.curso1b.exception.ResourceNotFoundException;
import com.prueba.curso1b.model.Employee;
import com.prueba.curso1b.repository.EmployeeRepository;
import com.prueba.curso1b.service.EmployeeService;
import com.sun.source.tree.TryTree;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
//Not to add the annotation @Transactional is not required because of Spring Data JPA internally provides the annotation
public class EmployeeServiceImpl implements EmployeeService {

    ///////////////////////////////////CREATING A DEPENDENCY INJECTION//////////////////////////////////////
    //Injection required to implement the methods.... constructor - based dependency injection
    //Not Autowired annotation needed because is the only constructor in the class
    private EmployeeRepository employeeRepository;

        //Add a constructor to this dependency
    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        //add super...
        super();
        this.employeeRepository = employeeRepository;
    }

    ////////////////////////////IMPLEMENTING METHOD SAVE EMPLOYEE///////////////////////////////
    //Implementing method created into EmployeeService, dependency injection is required.
    //Auto generate methods: Control + i
    @Override
    public Employee saveEmployee(Employee employee) {
        //return modified in order to save the employee instance in the database
        return employeeRepository.save(employee);
    }

    /////////////////////////IMPLEMENTING METHOD GET ALL EMPLOYEES//////////////////////////
    //Implementing method created into EmployeeService, the dependency injection only is required once only.
    @Override
    public List<Employee> getAllEmployees() {
        //Return modified in order to get all employees.
        return employeeRepository.findAll();
    }

    /////////////////////////IMPLEMENTING METHOD GET EMPLOYEE BY ID//////////////////////////
    //This method return an object of type optional in regard to an employee's parameters ***,
    //*** in tha way, the method receives an "id" and it will be looked at the Employee entity through the repository ***
    //*** and if this one is found it will be saved in the employee local object which will be an optional type,
    //*** bc of that we became the Entity as optional; otherwise, if the id is not found, the method will handle the exception,
    //*** with the ResourceNotFoundException method created previously.
    @Override
    public Employee getEmployeeById(Long id) {
        // WAY NUMBER 1
        //findById = return an optional object --> Optional<Employee>
//        Optional<Employee> employee = employeeRepository.findById(id);
//        if (employee.isPresent()){
//            return employee.get();
//        }else {
//            throw new ResourceNotFoundException("Employee","ID", id); //exception layer created
//        }

        // WAY NUMBER 2
        return employeeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Employee", "ID", id));

        // WAY NUMBER 3 BY JOHAN
//        Optional<Employee> employee = employeeRepository.findById(id);
//        try {
//            return employee.get();
//        }catch (Exception e){
//            throw new ResourceNotFoundException("Employee","ID", id); //exception layer created
//        }
    }

   /////////////////////////IMPLEMENTING METHOD UPDATE EMPLOYEE //////////////////////////
   //Implement methods = control + i
    @Override
   public Employee updateEmployee(Employee employee, long id) {

        //Method created by Johan (optional)
        //First: verify in the employee exist in the database or not using the id.
//        Optional<Employee> foundEmployee = employeeRepository.findById(id);
//        try{
//            //SET NEW VALUES WHICH WILL BE SENT ACCORDING TO THE CLIENT "employeeRepository"
//            foundEmployee.get().setFirstName(employee.getFirstName());
//            foundEmployee.get().setLastName(employee.getLastName());
//            foundEmployee.get().setEmail(employee.getEmail());
//
//            //SAVE EMPLOYEE AFTER VERIFYING EXISTENCE
//            employeeRepository.save(foundEmployee.get());
//        } catch (Exception e){
//            throw new ResourceNotFoundException("Employee","ID", id);
//        }
//       return foundEmployee.get();

        //Method created by tutor.
        //First: verify in the employee exist in the database or not using the id.
        Employee existingEmployee = employeeRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Employee","ID", id));
        //Second: SET NEW VALUES WHICH WILL BE SENT ACCORDING TO THE CLIENT "employeeRepository"
        existingEmployee.setFirstName(employee.getFirstName());
        existingEmployee.setLastName(employee.getLastName());
        existingEmployee.setEmail(employee.getEmail());
        //SAVE EMPLOYEE AFTER VERIFYING EXISTENCE
        employeeRepository.save(existingEmployee);
        return existingEmployee;
   }

   ///////////////////////// IMPLEMENTING METHOD DELETE EMPLOYEE /////////////////////////

    @Override
    //This method will be void because only carries out a given order.
    public void deleteEmployee(long id) {

//        //Method created by johan (optional)
//        Optional<Employee> foundEmployee = employeeRepository.findById(id);
//        try{
//            employeeRepository.deleteById(id);
//        }catch (Exception e){
//            throw new ResourceNotFoundException("Employee","ID", id);
//        }

        //Method created by tutor.
        //First method will check if the id exits
        //findById returns an optional outcome, so it requires an orElseThrow and an exception.
        employeeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Employee","ID", id));
        //then we have to directly give an order to repository to delete the employee through the id.
        employeeRepository.deleteById(id);
    }
}
