package com.app.config;

import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

import com.app.filters.JWTRequestFilter;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    @Autowired
    private JWTRequestFilter filter;

    // SAME behavior
    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration authenticationConfiguration
    ) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    // SAME behavior
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // SAME working as Spring Boot 2 version
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
            // equivalent of cors().and().csrf().disable()
            .cors(cors -> {})
            .csrf(csrf -> csrf.disable())

            // same unauthorized handling
            .exceptionHandling(exception -> exception
                .authenticationEntryPoint((request, response, ex) ->
                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED, ex.getMessage())
                )
            )

            // SAME authorization rules
            .authorizeHttpRequests(auth -> auth

                // Swagger access (same)
                .requestMatchers(
                    "/v2/api-docs",
                    "/v3/api-docs/**",
                    "/swagger-resources/**",
                    "/swagger-ui/**",
                    "/swagger-ui.html",
                    "/webjars/**"
                ).permitAll()

                // Public endpoints (same)
                .requestMatchers(
                    "/login",
                    "/customer/registerUser",
                    "/admin/getAllCategories",
                    "/user/getAdventuresByCategory/**",
                    "/",
                    "/user/registerUser",
                    "/user/getAllReviews",
                    "/auth/**"
                ).permitAll()

                // Role-based access (same)
                .requestMatchers("/admin/**").hasRole("ADMIN")
                .requestMatchers("/customer/**").hasRole("CUSTOMER")

                // OPTIONS (same)
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                // everything else secured
                .anyRequest().authenticated()
            )

            // SAME stateless session
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )

            // SAME JWT filter order
            .addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
