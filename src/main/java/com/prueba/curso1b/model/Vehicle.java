package com.prueba.curso1b.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;


@Data
@Entity
@Table(name = "vehicles")
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idVehicle;

    @Column(name = "plate")
    private String plate;

    @Column(name = "brand")
    private String brand;

    @Column(name = "model")
    private String model;

    @Column(name = "color")
    private String color;

    //---------------------------------------------------------------------------------------------------------------------------------
    /**Cardinality: (Employee: one to one: Vehicle)
     * (Non-owner)
     * One employee only has one Vehicle
     * Owner (Employee). Non-Owner (Vehicle)
     * */

    /**Non-Owner (mappedBy)
     * The non-owner has to have the mappedBy property,
     * mappedBy has to have a @JsonIgnore annotation
     * */
    @JsonIgnore
    @OneToOne(mappedBy = "vehicle")
    private Employee employee;

    //--------------------------------------------------------------------------------------------------------------------------------
    /**Cardinality: (Department: one to Many: Vehicle)
     * (Child)
     * one Department has many Vehicle.
     * Parent (Department). Child (Vehicle)
     */

    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;

}
