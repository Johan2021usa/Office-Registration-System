package com.prueba.curso1b.controller;

import com.prueba.curso1b.model.Employee;
import com.prueba.curso1b.model.Vehicle;
import com.prueba.curso1b.service.VehicleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // Marks class as controller (@Controller and @ResponseBody)
@RequestMapping({"/api/vehicles"})
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class VehicleController {

    /** Controller requirements:
     * 1. Class Annotations: @RestController, @RequestMapping, @CrossOrigin
     * 2. Dependency injection: VehicleService vehicleService
     * 3. Class constructor with parameters and super method
     * 4. Create controller methods according to service methods.
     * */

    // Dependency injection and class constructor with parameters and super method.
    private VehicleService vehicleService;
    public VehicleController(VehicleService vehicleService) {
        super();
        this.vehicleService = vehicleService;
    }

    /**Theory: Type of Mapping methods
     * PostMapping
     * GetMapping
     * DeleteMapping
     * PutMapping
     * */

    // Get all vehicles
    @GetMapping
    public List<Vehicle> getAllVehicles(){
        return vehicleService.getAllVehicles();
    }
    // Get By id vehicle
    @GetMapping("{id}")
    public ResponseEntity<Vehicle> getVehicleByID(@PathVariable("id") long id){
        return new ResponseEntity<Vehicle>(vehicleService.getVehicleByID(id), HttpStatus.OK);
    }
    // Save vehicle
    @PostMapping
    public ResponseEntity<Vehicle> saveVehicle(@RequestBody Vehicle vehicle){
        return new ResponseEntity<Vehicle>(vehicleService.saveVehicle(vehicle), HttpStatus.CREATED);
    }
    // Update vehicle
    @PutMapping("{id}")
    public ResponseEntity<Vehicle> updateVehicle(@PathVariable("id") long id, @RequestBody Vehicle vehicle){
        return new ResponseEntity<Vehicle>(vehicleService.updateVehicle(id, vehicle), HttpStatus.OK);
    }
    // Delete vehicle
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteVehicle(@PathVariable("id") long id){
        vehicleService.deleteVehicle(id);
        return new ResponseEntity<String>("Vehicle deleted successfully", HttpStatus.OK);
    }
}
