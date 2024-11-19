package com.floratask.br.FloraTask_BackEnd.application.ports.in;

import com.floratask.br.FloraTask_BackEnd.application.domain.Tarefa;

import java.util.List;

public interface TarefaUseCases {
    Tarefa getTarefaById(String id);

    List<Tarefa> getTarefaByNome(String nome, String userId);

    List<Tarefa> getTarefaByUserId(String userId);

    Tarefa postTarefa(Tarefa tarefa);

    Tarefa updateTarefa(Tarefa tarefaDetails, String id);

    void deleteTarefa(String id);
}
