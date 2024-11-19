package com.floratask.br.FloraTask_BackEnd.application;

import com.floratask.br.FloraTask_BackEnd.adapters.out.persistense.UsersJpaRepository;
import com.floratask.br.FloraTask_BackEnd.application.domain.Users;
import com.floratask.br.FloraTask_BackEnd.application.ports.in.UsersUseCase;
import com.floratask.br.FloraTask_BackEnd.application.ports.out.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class AuthorizationService implements UserDetailsService, UsersUseCase {

    @Autowired
    UsersJpaRepository usersJpaRepository;

    @Autowired
    UsersRepository usersRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return usersJpaRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário com o email: " + username + " não foi encontrado."));
    }

    @Override
    public Users getOneUser(String email) {
        return usersRepository.findByEmail(email).orElseThrow(() ->
                new NoSuchElementException("Usuário com o email: " + email + " não foi encontrado."));
    }
}
