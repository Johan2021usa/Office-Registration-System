package com.prueba.curso1b.model;

import lombok.Data;

import javax.persistence.*;

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
    private String Color;

    //Cardinality One employee has one Vehicle
    @OneToOne
    private Employee employee;

    //Cardinality one Department has many vehicles, and Many vehicles has one department.
    @ManyToOne
    private Department department;

}
