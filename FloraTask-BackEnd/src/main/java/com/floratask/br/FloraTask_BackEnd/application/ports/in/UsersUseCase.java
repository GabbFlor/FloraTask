package com.floratask.br.FloraTask_BackEnd.application.ports.in;

import com.floratask.br.FloraTask_BackEnd.application.domain.Users;

public interface UsersUseCase {
    Users getOneUser(String email);
}
