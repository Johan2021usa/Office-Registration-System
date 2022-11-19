package com.prueba.curso1b.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "departments")
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_dep")
    private long idDep;

    @Column(name = "department_name", nullable = false)
    private String departmentName;

    @Column(name = "department_salary")
    private float departmentSalary;

    @Column(name = "department_level")
    private String departmentLevel;

    //Cardinality sort is (One department can have many employees) and (One employee can have only one department)
    //MappedBy is used to define the name of the foreign key which will be related with the other entity,
    //In the other entity we have to define an object with the same name as you defined using Mapped annotation.
    // For this example, it will be "department"
    @JsonIgnore
    @OneToMany(mappedBy = "department")
    private List<Employee> employees;


}
