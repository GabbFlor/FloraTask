package com.floratask.br.FloraTask_BackEnd.adapters.out.persistense;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TarefaJpaRepository extends JpaRepository<TarefaEntity, String> {
    List<TarefaEntity> findByNomeContainingIgnoreCaseAndUserId(String nome, String userId);

    List<TarefaEntity> findByUserId(String userId);
}
