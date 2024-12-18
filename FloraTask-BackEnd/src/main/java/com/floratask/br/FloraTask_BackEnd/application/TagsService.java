package com.floratask.br.FloraTask_BackEnd.application;

import com.floratask.br.FloraTask_BackEnd.application.domain.Tags;
import com.floratask.br.FloraTask_BackEnd.application.ports.in.TagsUseCases;
import com.floratask.br.FloraTask_BackEnd.application.ports.out.TagsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class TagsService implements TagsUseCases {

    @Autowired
    private TagsRepository repository;

    @Override
    public Tags getOneTag(String id) {
        return repository.findById(id).orElseThrow(() ->
                new NoSuchElementException("Tag com o id " + id + " não foi encontrada."));
    }

    @Override
    public Tags getTagByIdAndUserId(String id, String userId) {
        return repository.findByIdAndUserId(id, userId).orElseThrow(() ->
                new NoSuchElementException("Tag com o id: " + id + " e id de usuário: " + userId + " não foi encontrada."));
    }

    @Override
    public List<Tags> getTagByUserId(String userId) {
        return repository.findByUserId(userId);
    }

    @Override
    public Tags PostTag(Tags tags) {
        return repository.save(tags);
    }

    @Override
    public Tags updateTag(Tags tagDetails, String id) {
        Tags tags = repository.findById(id).orElseThrow(() -> new NoSuchElementException("Tag com o id " + id + " não foi encontrada."));

        tags.setNome(tagDetails.getNome());
        tags.setDescricao(tagDetails.getDescricao());
        tags.setColor(tagDetails.getColor());
        tags.setUserId(tagDetails.getUserId());

        return repository.save(tags);
    }

    @Override
    public void deleteTag(String id) {
        repository.deleteById(id);
    }
}
