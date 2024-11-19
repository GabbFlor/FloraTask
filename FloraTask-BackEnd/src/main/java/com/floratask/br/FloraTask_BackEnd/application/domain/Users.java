package com.floratask.br.FloraTask_BackEnd.application.domain;

import com.floratask.br.FloraTask_BackEnd.adapters.out.persistense.UsersRole;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Users {
    private String id;

    private String email;

    private String nome;

    private String password;

    private UsersRole role;
}
