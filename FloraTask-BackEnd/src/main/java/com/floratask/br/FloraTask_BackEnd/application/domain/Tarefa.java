package com.floratask.br.FloraTask_BackEnd.application.domain;

import com.floratask.br.FloraTask_BackEnd.adapters.out.persistense.TagsEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Tarefa {
    private String id;

    private String nome;

    private String detalhes;

    private TagsEntity tags;

    private String userId;

    private String prazo;

    private Boolean isCompleted = false;

    private String criado_em;

//    adicionar imagem aqui
}
