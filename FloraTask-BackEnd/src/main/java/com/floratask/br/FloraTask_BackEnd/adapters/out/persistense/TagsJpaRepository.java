package com.floratask.br.FloraTask_BackEnd.adapters.out.persistense;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TagsJpaRepository extends JpaRepository<TagsEntity, String> {
}
