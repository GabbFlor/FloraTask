package com.floratask.br.FloraTask_BackEnd.application;

import com.floratask.br.FloraTask_BackEnd.adapters.out.persistense.TagsEntity;
import com.floratask.br.FloraTask_BackEnd.adapters.out.persistense.TagsJpaRepository;
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

    @Autowired
    private TagsJpaRepository tagsJpaRepository;

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
    public List<Tarefa> getTarefaCompletedByUserId(String userId) {
        return tarefaRepository.findCompletedByUserId(userId);
    }

    @Override
    public List<Tarefa> getTarefaIncompletedByUserId(String userId) {
        return tarefaRepository.findIncompletedByUserId(userId);
    }

    @Override
    public Tarefa postTarefa(Tarefa tarefa) {
        if (tarefa.getTags() == null || tarefa.getTags().getId() == null) {
            System.out.println("A tarefa não possui tag associada ou o ID da tag é nulo.");
            tarefa.setTags(null);
        } else {
            TagsEntity tagExistente = tagsJpaRepository.findById(tarefa.getTags().getId())
                    .orElseThrow(() -> new RuntimeException("Tag não encontrada"));
            tarefa.setTags(tagExistente);
        }

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
