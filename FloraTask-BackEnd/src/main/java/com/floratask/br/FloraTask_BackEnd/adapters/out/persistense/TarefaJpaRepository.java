package com.floratask.br.FloraTask_BackEnd.adapters.out.persistense;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TarefaJpaRepository extends JpaRepository<TarefaEntity, String> {
    List<TarefaEntity> findByNomeContainingIgnoreCase(String nome);
}
