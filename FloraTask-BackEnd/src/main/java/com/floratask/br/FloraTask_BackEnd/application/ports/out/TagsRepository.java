package com.floratask.br.FloraTask_BackEnd.application.ports.out;

import com.floratask.br.FloraTask_BackEnd.application.domain.Tags;

import java.util.List;
import java.util.Optional;

public interface TagsRepository {
    Optional<Tags> findById(String id);

    Optional<Tags> findByIdAndUserId(String id, String userId);

    List<Tags> findByUserId(String userId);

    Tags save(Tags tags);

    void deleteById(String id);
}
