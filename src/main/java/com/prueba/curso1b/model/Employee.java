package com.prueba.curso1b.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;

@Data //getters, setters, constructors
@Entity // mark as entity class
@Table(name = "employees") // create a table in the db
public class Employee {


    @Id //this is the primary key of the entity and BD
    @GeneratedValue(strategy = GenerationType.IDENTITY) //each primary key needs a generation strategy
    private long id; //second parameter of jpaRepository

    //A column is an attribute of the DB, in this case this is not null
    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_Name")
    private String lastName;

    @Column(name = "email")
    private String email;

    //Because of this a department can have many employees, this entity has to receive the foreign key.
    //this foreign key will be annotated with the opposite way (one to many) --> (many to one)
    //The name of this object created has to have the same name of the Mapped option...
    @ManyToOne
    private Department department;
}
