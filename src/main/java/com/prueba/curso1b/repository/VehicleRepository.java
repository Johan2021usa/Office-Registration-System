package com.prueba.curso1b.repository;

import com.prueba.curso1b.model.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;

/**Theory about: @Repository
 * When we create an API with Spring Boot, one class will be the repository,
 * this one will be marked with the @Repository annotation, and it's mandatory,
 * however, when we use Spring Data JPA dependency, it isn't necessary use it, Why?
 * in this case, we are inheriting all methods of JpaRepository and whether you open this class, you will find the @Repository annotation internally,
 * hence, our class has already this annotation.
 * */

/** Theory about: Repository
 * When we use methods such as Delete, Put, Get and Post, these methods will be placed here,
 * in this case, as result of we are using Spring Data JPA, we don't need to create any method,
 * since This dependency, has these main methods internally created.
 * however, if we need a different method, we need to use JAVA SQL, or Query annotations to persist the Database.
 * */
public interface VehicleRepository extends JpaRepository<Vehicle,Long> {
}
