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
    public List<Tarefa> findAll() {
        return tarefaJpaRepository.findAll().stream().map(this::toDomain).collect(Collectors.toList());
    }

    @Override
    public Optional<Tarefa> findById(String id) {
        return tarefaJpaRepository.findById(id).map(this::toDomain);
    }

    @Override
    public List<Tarefa> findByNome(String nome) {
        return tarefaJpaRepository.findByNomeContainingIgnoreCase(nome).stream().map(this::toDomain).collect(Collectors.toList());
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
        tarefa.setUser_id(entity.getUser_id());
        tarefa.setPrazo(entity.getPrazo());
        tarefa.setCriado_em(String.valueOf(entity.getCriado_em()));
        return tarefa;
    }

    private TarefaEntity toEntity(Tarefa tarefa) {
        TarefaEntity entity = new TarefaEntity();
        entity.setId(tarefa.getId());
        entity.setNome(tarefa.getNome());
        entity.setDetalhes(tarefa.getDetalhes());
        entity.setTags(tarefa.getTags());
        entity.setUser_id(tarefa.getUser_id());
        entity.setPrazo(tarefa.getPrazo());
        entity.setCriado_em(LocalDateTime.parse(tarefa.getCriado_em()));
        return entity;
    }
}
