package com.floratask.br.FloraTask_BackEnd.application.DTO;

import com.floratask.br.FloraTask_BackEnd.adapters.out.persistense.UsersRole;

public record UsersInfoDTO(String email, String nome, UsersRole role) {
}
