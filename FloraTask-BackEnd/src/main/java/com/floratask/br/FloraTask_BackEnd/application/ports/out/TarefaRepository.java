package com.floratask.br.FloraTask_BackEnd.application.ports.out;

import com.floratask.br.FloraTask_BackEnd.application.domain.Tarefa;

import java.util.List;
import java.util.Optional;

public interface TarefaRepository {
    Optional<Tarefa> findById(String id);

    List<Tarefa> findByNome(String nome, String userId);

    List<Tarefa> findByUserId(String userId);

    Tarefa save(Tarefa tarefa);

    void deleteById(String id);
}