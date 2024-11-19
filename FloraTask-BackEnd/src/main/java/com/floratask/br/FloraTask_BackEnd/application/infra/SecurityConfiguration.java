package com.floratask.br.FloraTask_BackEnd.application.infra;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    @Autowired
    SecurityFilter securityFilter;

//    configuração do CORS
    @Bean
    public UrlBasedCorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("http://localhost:5173"); // Permitir origem do React Vite
        configuration.addAllowedMethod("*"); // Permitir todos os métodos (GET, POST, etc.)
        configuration.addAllowedHeader("*"); // Permitir todos os headers
        configuration.setAllowCredentials(true); // Permitir envio de credenciais (cookies, headers de autenticação)

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // Aplicar a todas as rotas
        return source;
    }

//    definição do que cada role pode fazer no sistema
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize
//                        Rota de autenticação
                        .requestMatchers(HttpMethod.POST, "/auth/login").permitAll()
                        .requestMatchers(HttpMethod.POST, "/auth/registro").permitAll()

//                        rota de TAGs
                        .requestMatchers(HttpMethod.POST, "/tags").hasRole("USER")
                        .requestMatchers(HttpMethod.GET, "/tags/getTagById/*").hasRole("USER")
                        .requestMatchers(HttpMethod.GET, "/tags/getByUserId/*").hasRole("USER")
                        .requestMatchers(HttpMethod.PUT, "/tags/*").hasRole("USER")
                        .requestMatchers(HttpMethod.DELETE, "/tags/*/*").hasRole("USER")

//                        rota de Tarefa
                        .requestMatchers(HttpMethod.POST, "/tarefa").hasRole("USER")
                        .requestMatchers(HttpMethod.GET, "/tarefa/getById/*").hasRole("USER")
                        .requestMatchers(HttpMethod.GET, "/tarefa/getByNome/*/userId/*").hasRole("USER")
                        .requestMatchers(HttpMethod.GET, "/tarefa/getByUserId/*").hasRole("USER")
                        .requestMatchers(HttpMethod.PUT, "/tarefa/*").hasRole("USER")
                        .requestMatchers(HttpMethod.DELETE, "/tarefa/*/*").hasRole("USER")
                        .anyRequest().authenticated()
                )
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
