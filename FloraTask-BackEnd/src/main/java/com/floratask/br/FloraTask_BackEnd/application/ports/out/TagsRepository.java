package com.floratask.br.FloraTask_BackEnd.application.ports.out;

import com.floratask.br.FloraTask_BackEnd.application.domain.Tags;

import java.util.List;
import java.util.Optional;

public interface TagsRepository {
    List<Tags> findAll();

    Optional<Tags> findById(String id);

    Tags save(Tags tags);

    void deleteById(String id);
}
