package com.prueba.curso1b.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
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

    //---------------------------------------------------------------------------------------------------------------------------------
    /** Cardinality: (Department: One to many: Employees)
     * (Parent)
     * One Department might have many Employees and one Employee can only have one Department.
     * Parent (Department). child (Vehicles).
     * Inside of child entity we have to declare an object with the same name defined in the MappedBy annotation,
     * For this example, it will be: private Department department;
     */

    /** JsonIgnore, MappedBy and Cascade:
     * JsonIgnore: Avoids a column is created each time we run the project
     * mappedBy: determines who is the adult in the relationship
     * cascade: determines whether department is deleted, employee or employees related with this entity will be deleted too,
     * this allows us to keep the data integrity, it means there cannot be foreign keys alone.
     * */
    @JsonIgnore
    @OneToMany(mappedBy = "department",cascade = CascadeType.ALL)
    /**Object  created:
     * The object created in the parent entity has to receive a list (many) of employees.
     * */
    private List<Employee> employees;

    //---------------------------------------------------------------------------------------------------------------------------------
    /** Cardinality: (Department: one to many: Vehicles)
     * (Parent)
     * one Department might have many Vehicles
     * Parent (Department). child (Vehicles)
     * */
    @JsonIgnore
    @OneToMany(mappedBy = "department", cascade = CascadeType.ALL)
    private List<Vehicle> vehicles;


}
