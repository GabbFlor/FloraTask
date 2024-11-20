package com.floratask.br.FloraTask_BackEnd.application.DTO;

import com.floratask.br.FloraTask_BackEnd.adapters.out.persistense.UsersRole;

public record RegistroDTO(String email, String nome, String password, UsersRole role) {
}
