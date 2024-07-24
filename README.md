# OFFICE REGISTRATION SYSTEM v1.0

- **Developer:** Johan Lasso
- **LinkedIn:** https://www.linkedin.com/in/jairo-johan-lasso-47165a223/

## 1. Overview
This system allows you to implement a registration system for an office by including three main components: Employees, Departments and Vehicles.
It allows you to save, update, delete an see registers based on your needs. This software incorporates a amiable interface easy to use.

I hope you like it.

## 2. Technical Description
This system in the ***back-end*** is composed by a API-REST and was developed with the next technologies:

- Spring Boot 2.7.2
- Java 11
- Apache Maven 3.9.6 
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

