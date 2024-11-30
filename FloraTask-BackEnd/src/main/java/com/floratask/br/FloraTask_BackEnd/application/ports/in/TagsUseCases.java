package com.floratask.br.FloraTask_BackEnd.application.ports.in;

import com.floratask.br.FloraTask_BackEnd.application.domain.Tags;

import java.util.List;

public interface TagsUseCases {
    Tags getOneTag(String id);

    Tags getTagByIdAndUserId(String id, String userId);

    List<Tags> getTagByUserId(String userId);

    Tags PostTag(Tags tags);

    Tags updateTag(Tags tagDetails, String id);

    void deleteTag(String id);
}