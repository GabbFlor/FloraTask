package com.floratask.br.FloraTask_BackEnd.application;

import com.floratask.br.FloraTask_BackEnd.application.domain.Tarefa;
import com.floratask.br.FloraTask_BackEnd.application.ports.in.TarefaUseCases;
import com.floratask.br.FloraTask_BackEnd.application.ports.out.TarefaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class TarefaService implements TarefaUseCases {

    @Autowired
    private TarefaRepository tarefaRepository;

    @Override
    public Tarefa getTarefaById(String id) {
        return tarefaRepository.findById(id).orElseThrow(() ->
                new NoSuchElementException("Tarefa com o id: " + id + " não foi encontrada."));
    }

    @Override
    public List<Tarefa> getTarefaByNome(String nome, String userId) {
        return tarefaRepository.findByNome(nome, userId);
    }

    @Override
    public List<Tarefa> getTarefaByUserId(String userId) {
        return tarefaRepository.findByUserId(userId);
    }

    @Override
    public Tarefa postTarefa(Tarefa tarefa) {
        return tarefaRepository.save(tarefa);
    }

    @Override
    public Tarefa updateTarefa(Tarefa tarefaDetails, String id) {
        Tarefa tarefa = tarefaRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Não foi possivel encontrar a tarefa com o id: " + id));

        tarefa.setNome(tarefaDetails.getNome());
        tarefa.setDetalhes(tarefaDetails.getDetalhes());
        tarefa.setTags(tarefaDetails.getTags());
        tarefa.setPrazo(tarefaDetails.getPrazo());

        return tarefaRepository.save(tarefa);
    }

    @Override
    public void deleteTarefa(String id) {
        tarefaRepository.deleteById(id);
    }
}
