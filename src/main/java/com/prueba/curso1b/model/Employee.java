package com.prueba.curso1b.model;

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

}
