package com.prueba.curso1b.service.impl;

import com.prueba.curso1b.exception.ResourceNotFoundException;
import com.prueba.curso1b.model.Vehicle;
import com.prueba.curso1b.repository.VehicleRepository;
import com.prueba.curso1b.service.VehicleService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VehicleServiceImpl implements VehicleService {

    /** Service implementation:
     * Service annotation
     * 1. Implements an interface: Vehicle Service.
     * 2. Dependency injection: Inject repository.
     * 3. Create a class constructor with parameters: Parameters(VehicleRepository repository)
     * 4. Add super method inside the constructor.
     * 5. Override methods of service. (replace)
     */

    // 2.Dependency injection
    private VehicleRepository vehicleRepository;
    public VehicleServiceImpl(VehicleRepository repository) { // 3. Class constructor with parameters
        super();  // 4. super method
        this.vehicleRepository = repository;
    }

    // 5. Override methods
    /** In case of you are not using an exception, use .orElse(null) instead .orElseThrow() */

    // GET ALL: return
    @Override
    public List<Vehicle> getAllVehicles(){
        return vehicleRepository.findAll();
    }

    // GET BY ID: return
    @Override
    public Vehicle getVehicleByID(long id){
        return vehicleRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Vehicle","ID", id));
    }

    // SAVE: return
    @Override
    public Vehicle saveVehicle(Vehicle vehicle){
        return vehicleRepository.save(vehicle);
    }

    // UPDATE: find, modify, save, return
    @Override
    public Vehicle updateVehicle(long id, Vehicle vehicle){
        // Find
        Vehicle retrievedVehicle = vehicleRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Vehicle", "ID", id));
        // Modify
        retrievedVehicle.setPlate(vehicle.getPlate());
        retrievedVehicle.setBrand(vehicle.getBrand());
        retrievedVehicle.setModel(vehicle.getModel());
        retrievedVehicle.setColor(vehicle.getColor());
        // Save changes
        vehicleRepository.save(retrievedVehicle);
        // Return object
        return retrievedVehicle;
    }

    // Delete: find/delete
    @Override
    public void deleteVehicle(long id){
        vehicleRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Vehicle", "ID", id));
        vehicleRepository.deleteById(id);
    }

}
