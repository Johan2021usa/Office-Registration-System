package com.prueba.curso1b.controller;

import com.prueba.curso1b.model.Employee;
import com.prueba.curso1b.service.EmployeeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//1. @Controller annotation is not required because it requires @ResponseBody in order to simplify the code we can use the @RestController annotation which combine those all in one.
@RestController
//This Request can be omitted and the complement can be placed inside PostMapping annotation.
@RequestMapping({"/api/employees"})
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST,RequestMethod.PUT,RequestMethod.DELETE})
//@CrossOrigin(origins = "http://localhost:8080")
public class EmployeeController {

    //////////////DEPENDENCY INJECTION/////////////////
    //2. Declare a Dependency injection of the service layer (interface), because of Controller depends on the service
    private EmployeeService employeeService;

    //3.Create a constructor method for this dependency
    public EmployeeController(EmployeeService employeeService) {
        //4. add super command bellow
        super();
        this.employeeService = employeeService;
    }

    ///////BUILD CREATE EMPLOYEE (REST API) (SAVE EMPLOYEE)////////////////
    //Return method = ResponseEntity<here goes the model class or entity>
    @PostMapping //we can put ("employees") but to maintain this code we can put it in the RequestMapping.
    //ResponseEntity is to get more response details
    public ResponseEntity<Employee> saveEmployee(@RequestBody Employee employee){
        //This return send the employee object to the saveEmployee method.
        return new ResponseEntity<Employee>(employeeService.saveEmployee(employee), HttpStatus.CREATED);
    }

    //////BUILD GET ALL EMPLOYEE (REST API) (GET ALL EMPLOYEE)////////////////
    //List will handle a collection of objects or data.

    @GetMapping //GetMapping is going to handle HTTP get request.
    //@CrossOrigin(origins = "http://localhost:8080/api/employees")
    public List<Employee> getAllEmployees(){
        return employeeService.getAllEmployees();
    }

    /////BUILD GET EMPLOYEE BY ID  (REST API) (GET + ID)/////////////////////
    @GetMapping("{id}")//Annotation with the first part of the path variable.
    //Method type Response Entity, with the second part of the path variable, same name in both parts.
    public ResponseEntity<Employee> getEmployeeById(@PathVariable("id") long employeeId){
        //This return bring the information handled by the service and its method, and a http response.
        return new ResponseEntity<Employee>(employeeService.getEmployeeById(employeeId), HttpStatus.OK);
    }

    /////BUILD UPDATE EMPLOYEE (REST API) (PUT OR UPDATE)////////////////////
    @PutMapping("{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable("id") long id, @RequestBody Employee employee){
        return new ResponseEntity<Employee>(employeeService.updateEmployee(employee, id), HttpStatus.OK);
    }

    /////BUILD DELETE EMPLOYEE (REST API) //////////////////////////////////////
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable("id") long idEmployee){
        employeeService.deleteEmployee(idEmployee);
        return new ResponseEntity<String>("Employee deleted successfully", HttpStatus.OK);
    }
}
