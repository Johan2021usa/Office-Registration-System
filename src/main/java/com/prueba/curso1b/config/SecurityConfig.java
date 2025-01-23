package com.prueba.curso1b.config;

import org.springframework.context.annotation.Bean;
import static org.springframework.security.config.Customizer.withDefaults;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity // Add this annotation to override the default security configuration of Spring Security
public class SecurityConfig{
    /**
     * Activating sources - Documentation - annotations (optional)
     * Settings -> Build, execution, deployment -> Build Tools -> Maven -> importing -> check: Sources, Documentation, Annotations.
     * Then save changes and reload the project using Maven. Then you will see the documentation in internal classes.
     * */

    /**
    * TYPES OF AUTHENTICATION:
    * There are three main ways of authentication:
    * 1. FORM LOGIN --> used for servlet applications / uses an HTML/Interface to log.
    * 2. BASIC LOGIN --> This way is by sending a request through Postman/Fetch, proper for APIs Rest.
    * When we don't configure a security filter chain, spring boot will use the defaultSecurityFilterChain, by using the
    * class: SpringBootWebSecurityConfiguration.class
    * */

    /**
     * WAYS TO STORE CREDENTIALS:
     * 1. when we don't configure the security filter chain and the UserDetailsService, the default credentials for authentication will:
     * user: user
     * password: verify console since is generated dynamically.
     * 2. However, we can set those values in the application properties as well (check the file), this should be used for development process only.
     * 3. On the other hand, we can also create users directly in the configuration file by implementing the userDetailService, although this one isn't for production environments neither.
     * 4. On contrast, the proper way to handle this is saving credentials in a DB.
     * */

    /**
     * HOW TO CONFIGURE THE AUTHORIZATION:
     * We need to configure the securityFilterChain class, since this provides us the methods to defile roles a so on.
     * If we don't configure it, Spring Boot will set the defaultSecurityFilterChain that you can find in the SpringBootWebSecurityConfiguration class.
     * */

    @Bean // Configuring a bean that returns an SecurityFilterChain by implementing a new one that receives an HTTP request.
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        //Authorization configuration based on a user defined security filter chain.
        http.authorizeHttpRequests((requests) -> requests
            .requestMatchers(HttpMethod.GET, "/index.html").permitAll()
            .requestMatchers(HttpMethod.GET, "css/estilos.css").permitAll()

            // DEPARTMENTS RBAC
            .requestMatchers(HttpMethod.GET, "/department.html").hasRole("ADMIN")
            .requestMatchers(HttpMethod.GET, "/api/departments").hasRole("ADMIN")
            .requestMatchers(HttpMethod.POST, "/api/departments").hasRole("ADMIN")
            .requestMatchers(HttpMethod.PUT, "/api/departments/***").hasAnyRole("USER", "ADMIN")
            .requestMatchers(HttpMethod.DELETE, "/api/departments/***").hasRole("ADMIN")

            // EMPLOYEES RBAC
            .requestMatchers(HttpMethod.GET, "/api/employees").hasRole("ADMIN")
            .requestMatchers(HttpMethod.POST, "/api/employees").hasAnyRole("USER", "ADMIN")
            .requestMatchers(HttpMethod.PUT, "/api/employees/***").hasAnyRole("USER", "ADMIN")
            .requestMatchers(HttpMethod.DELETE, "/api/employees/***").hasAnyRole("USER", "ADMIN")

            // VEHICLE RBAC
            .requestMatchers(HttpMethod.POST, "/api/vehicles").hasAnyRole("USER", "ADMIN")
            .requestMatchers(HttpMethod.PUT, "/api/vehicles/***").hasAnyRole("USER", "ADMIN")
            .requestMatchers(HttpMethod.DELETE, "/api/vehicles/***").hasRole("ADMIN")
            // The rest resources allowed for authenticated users, including html, css or js files
            .anyRequest().authenticated()
        );
        // It disables authentication per request, not needed in REST.
        http.csrf(csrf -> csrf.disable());
        // Remove cookies, so that session will depend on the server response instead of session saved in local storage or cookies.
//        http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        /**
        * 2. LOGIN-FROM AUTHENTICATION:
        * This method is the default in Spring Boot, and we use it for MVC applications, since it depends on a form to log in to the application,
        * and request are done based on cookies and session log in unlike Rest APIs that are stateless.
        */
        http.formLogin(withDefaults());

        /**
        * 3. BASIC Authentication:
        * It works with an alert box to send username and password,
        * In case you use Postman or fetch... to consume the API, you have to send those two values in the header,
        * however, since they are sent encrypted, we must know how to create the request properly.
        *
        * Additionally, with basic authentication there aren't login and logout resources by default, unlike formLogin authentication,
        * thus, we must configure them in order to dispose of them.
        * */
//        .httpBasic(withDefaults());
        return http.build();
    }

    /*
     * THEORY 2: STORING PASSWORDS
     * When it comes to store passwords and amounts of users, there are three main ways to create and store users:
     * Way #1 Default way: This works setting a user in the application properties or configuration.yml
     * WAY #2 In Memory Authentication: This option allows spring security save passwords and users in memory, this is  not
     * meant for production stage.
     * WAY #3 In Storage Authentication: Users are created and their information is saved in a Database, use this for production stage.
     * */

    /*
     * 2.1 InMemoryAuthentication
     *
     * 2.1.1 UserDetailService: This class allows us to configure and set up credentials and everything regarding user information to log in then application.
     * That is the reason, we return a class of this type.
     * */
//    @Bean
//    public UserDetailsService userDetailsService(){
//        /*
//         * 2.2 Here we are returning a memory user by implement InMemoryAuthentication that at the same time is a implementation of UserDetailsManager;
//         * class that is in charge of managing user registers.
//         */
//        // 2.2.1 UserDetail: We create a user detail in memory based on User class that will be sent to the UserDetailManager class.
//        UserDetails user1 = User
//                .withUsername("pedro")
//                // {noop} indicates that is not encrypted yet, additionally these values should come from a DB.
//                .password("{noop}pedro123")
//                .roles("USER")
//                .build();
//
//        UserDetails user2 = User
//                .withUsername("johan")
//                .password("{noop}johan123")
//                .roles("ADMIN")
//                .build();
//
//        //2.2.2 InMemoryUserDetailsManager: it receives a user detail and a role.
//        return new InMemoryUserDetailsManager(user1, user2);
//
//    }
}
