package com.floratask.br.FloraTask_BackEnd.application.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Tags {
    private String id;

    private String Nome;

    private String Descricao;

    private String color;

    private String user_id;

    private String criado_em;
}
