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

    //---------------------------------------------------------------------------------------------------------------------------------
    /**Cardinality: (Department: One to many: Employees)
     * (Child)
     * one Department might have many employees
     * Parent (Department). Child (Employee)
     * the child entity has to receive the foreign key related to the parents primary key.
     * Cardinality will be annotated in the opposite way (one to many) --> (many to one)
     * The name of this object created has to have the same name of the Mapped option...
     */

    /**JoinColumn:
     * This annotation determines who is the child in the relationship,
     * and it will receive the foreign key
     * name: this is the name that the foreign key will have in the table.
     * */
    @ManyToOne
    @JoinColumn(name = "department_id")
    /**Object created:
     * The object created has to have the same name we defined in the Department's mappedBy annotation*/
    private Department department;

    //---------------------------------------------------------------------------------------------------------------------------------
    /**Cardinality: (Employee: One to One: Vehicle)
     * (Owner)
     * one Employee has one Vehicle.
     * Owner (Employee). Non-Owner (Vehicle)
     */

    /**Theory about one to one cardinality:
     * When we talk about oneToOne relationship, we cannot define a Parent or a Child because both share the same characteristic,
     * so that, to use properly @JoinColumn annotation and mappedBy property,
     * we have to define an Owner, this will contain the foreign key,
     * we can define the Owner according to your needs,
     * for instance I prefer the employee contains a column which says the id vehicle.
     * */

    /** Owner (@JoinColumn):
     * to define the owner we have to use the: @JoinColumn annotation:
     * name: defines the foreign key name in the table
     * */

    /** Theory about: unique=true
     * Each time we work with a relationship one to one; an entity can be only related to another entity,
     * in case, we don't use unique true, each time a new employee uses an id_vehicle that is already related to another entity,
     * there will be an error in the database, and the only solution will be dropping the database,
     * this is rather important and because of that, we have to avoid this issue before production using:
     * unique=true, which returns an exception that can be handled properly without affecting the database.
     * */

    @OneToOne
    @JoinColumn(name = "id_vehicle", unique = true)
    private Vehicle vehicle;
}
