package com.prueba.curso1b.service;

import com.prueba.curso1b.model.Vehicle;

import java.util.List;

public interface VehicleService{

    /** Theory: Three tier architecture is composed by:
     * Data access layer (Repository): It's in charge of interacting with the database, uses SQL queries, Query methods or Spring Data JPA dependency to fulfill that purpose.
     * Business logic layer (Service classes): This layer contains all logical process, and also passes information to repository and controller.
     * Presentation layer (Controller): This layer controls all the information required or send by the user using http methods.
     * additionally, this is the flow of information in this structure:
     * Repository: direct control of the database, cannot be handled by the user directly.
     * service: Uses the repository methods for accessing to the database, however, this layer determines and filters the amount information asked in each method.
     * Controller: Uses the service methods for retrieving, sending, updating or deleting data of the database from user actions.
     */

    /** Way to declare general methods (Spring data JPA)
     * Get a list of vehicles, it doesn't require an ID (getAll), returns a list of vehicles.
     * Get a specific vehicle, it requires an ID (getByID), return a vehicle object.
     * Save a vehicle, it requires an object (This objects internally contains an ID), returns a new vehicle.
     * Update a vehicle, it requires an ID to find a vehicle and an object with the new information, returns a new vehicle.
     * Delete a vehicle, it requires an ID, doesn't return anything.
     */

    //Note an interface is an abstract class that contains abstract methods, isn't mandatory to declare methods as abstract, but it's a good practice.
    /** Structure method declaration:
     * accessibility (public, private, etc)
     * type (none, abstract)
     * return (void, object, type of data)
     * Method's name
     * parameters (none, type or data, object)
     */

    /** Service Interface
     * Why we need a service interface and a service implementation class?
     * The reason is the encapsulation principle, we will overwrite the methods that belongs to vehicleService in the vehicleServiceImplementation.
     * then, the controller will inject methods that belongs to vehicleService, this hides any internal method that belongs to the repository.
     * */

    public abstract List<Vehicle> getAllVehicles();
    public abstract Vehicle getVehicleByID(long id);
    public abstract Vehicle saveVehicle(Vehicle vehicle);
    public abstract Vehicle updateVehicle(long id, Vehicle vehicle);
    public abstract void deleteVehicle(long id);


}
