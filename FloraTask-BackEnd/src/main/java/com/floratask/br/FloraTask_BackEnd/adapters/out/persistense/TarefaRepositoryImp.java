package com.floratask.br.FloraTask_BackEnd.adapters.out.persistense;

import com.floratask.br.FloraTask_BackEnd.application.domain.Tarefa;
import com.floratask.br.FloraTask_BackEnd.application.ports.out.TarefaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class TarefaRepositoryImp implements TarefaRepository {

    @Autowired
    private TarefaJpaRepository tarefaJpaRepository;

    @Override
    public Optional<Tarefa> findById(String id) {
        return tarefaJpaRepository.findById(id).map(this::toDomain);
    }

    @Override
    public List<Tarefa> findByNome(String nome, String userId) {
        return tarefaJpaRepository.findByNomeContainingIgnoreCaseAndUserId(nome, userId).stream().map(this::toDomain).collect(Collectors.toList());
    }

    @Override
    public List<Tarefa> findCompletedByUserId(String userId) {
        return tarefaJpaRepository.findByUserIdAndIsCompletedTrue(userId).stream().map(this::toDomain).collect(Collectors.toList());
    }

    @Override
    public List<Tarefa> findIncompletedByUserId(String userId) {
        return tarefaJpaRepository.findByUserIdAndIsCompletedFalse(userId).stream().map(this::toDomain).collect(Collectors.toList());
    }

    @Override
    public Tarefa save(Tarefa tarefa) {
        TarefaEntity tarefaEntity = toEntity(tarefa);
        return toDomain(tarefaJpaRepository.save(tarefaEntity));
    }

    @Override
    public void deleteById(String id) {
        tarefaJpaRepository.deleteById(id);
    }

    private Tarefa toDomain(TarefaEntity entity) {
        Tarefa tarefa = new Tarefa();
        tarefa.setId(entity.getId());
        tarefa.setNome(entity.getNome());
        tarefa.setDetalhes(entity.getDetalhes());
        tarefa.setTags(entity.getTags());
        tarefa.setUserId(entity.getUserId());
        tarefa.setPrazo(entity.getPrazo());
        tarefa.setIsCompleted(entity.getIsCompleted());

//        campo para verificar o valor de "criado_em" e evitar NullPointerException

        if (entity.getCriado_em() != null) {
            tarefa.setCriado_em(String.valueOf(entity.getCriado_em()));
        }

        return tarefa;
    }

    private TarefaEntity toEntity(Tarefa tarefa) {
        TarefaEntity entity = new TarefaEntity();
        entity.setId(tarefa.getId());
        entity.setNome(tarefa.getNome());
        entity.setDetalhes(tarefa.getDetalhes());
        entity.setTags(tarefa.getTags());
        entity.setUserId(tarefa.getUserId());
        entity.setPrazo(tarefa.getPrazo());
        entity.setIsCompleted(tarefa.getIsCompleted());

//        campo para verificar o valor de "criado_em" e evitar NullPointerException

        if (tarefa.getCriado_em() != null && tarefa.getCriado_em().isEmpty()) {
            try {
                entity.setCriado_em(LocalDateTime.parse(tarefa.getCriado_em()));
            } catch (Exception e) {
                System.err.println("Erro ao converter 'criado_em' para LocalDateTime: " + e.getMessage());
                entity.setCriado_em(null);
            }
        }

        return entity;
    }
}
