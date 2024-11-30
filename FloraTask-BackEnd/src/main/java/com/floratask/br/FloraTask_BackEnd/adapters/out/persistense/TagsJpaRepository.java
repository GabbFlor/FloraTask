package com.floratask.br.FloraTask_BackEnd.adapters.out.persistense;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TagsJpaRepository extends JpaRepository<TagsEntity, String> {
    List<TagsEntity> findByUserId(String userId);

    Optional<TagsEntity> findByIdAndUserId(String id, String userId);
}
