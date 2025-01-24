# OFFICE REGISTRATION SYSTEM v1.0

- **Developer:** Johan Lasso
- **LinkedIn:** https://www.linkedin.com/in/jairo-johan-lasso-47165a223/

## 1. Overview
This system allows you to implement a registration system for an office by including three main components: Employees, Departments and Vehicles.
It allows you to save, update, delete an see registers based on your needs. This software incorporates a amiable interface easy to use.

The next is the Relation Entity Model of the project:

 ![Entity relation diagram](/src/main/resources/static/img/M-E-R-office-system.png)

I hope you like it.

## 2. Technical Description
This system in the ***back-end*** is composed by a API-REST and was developed with the next technologies:

- Spring Boot 3.3.2
- Java 17
- Apache Maven 4.0.0
- Spring Security 6.3.1
- MySQL
- Spring JPA-Hibernate (Dependency)
- Spring Boot Web starter (Dependency)
- Spring Boot Devtools (Dependency)
- MySQL connector for Java (Dependency)
- Lombok (Dependency)

As to the front-end, the system was developed with the next technologies:
- Vanilla Javascript
- CSS3
- HTML5

Additionally, this system is being deployed in a VM from OCI, the instance is based on Oracle Linux 9.

## 3. Project Execution Steps
In case you use IntelliJ you just need to have MySQL and create the database w
As long as the database system, Maven and Java are installed, clone the repository and follow the next steps:
- Get in the repository root folder.
- **mvn clean package -DskipTests** ==> This will create a .jar of the project in the target folder and executes it automatically.
- Get in the target folder.
- **sudo java -jar (name if the .jar)** ==> example: **sudo java -jar My-app.jar** ===> This command executes the Spring Boot application based on a jar file.

## 4. Testing User Login Credentials
These credentials allow you to access to all resources of the API, however, as invited you will be redirected to the home page.
- **user:**  johan
- **password:** test*2024

# Pending links: 
- https://docs.spring.io/spring-security/reference/servlet/authentication/logout.html#customizing-logout-uris
- https://docs.spring.io/spring-security/reference/servlet/authentication/passwords/index.html


