package com.floratask.br.FloraTask_BackEnd.application.ports.out;

import com.floratask.br.FloraTask_BackEnd.application.domain.Users;

import java.util.Optional;

public interface UsersRepository {
    Optional<Users> findByEmail(String email);
}
