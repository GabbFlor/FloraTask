package com.floratask.br.FloraTask_BackEnd.adapters.out.persistense;

import com.floratask.br.FloraTask_BackEnd.application.domain.Tags;
import com.floratask.br.FloraTask_BackEnd.application.ports.out.TagsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class TagsRepositoryImp implements TagsRepository {

    @Autowired
    private TagsJpaRepository tagsJpaRepository;

    @Override
    public List<Tags> findAll() {
        return tagsJpaRepository.findAll().stream().map(this::toDomain).collect(Collectors.toList());
    }

    @Override
    public Optional<Tags> findById(String id) {
        return tagsJpaRepository.findById(id).map(this::toDomain);
    }

    @Override
    public Tags save(Tags tags) {
        TagsEntity tagsEntity = toEntity(tags);
        return toDomain(tagsJpaRepository.save(tagsEntity));
    }

    @Override
    public void deleteById(String id) {
        tagsJpaRepository.deleteById(id);
    }

    private Tags toDomain(TagsEntity entity) {
        Tags tags = new Tags();
        tags.setId(entity.getId());
        tags.setNome(entity.getNome());
        tags.setDescricao(entity.getDescricao());
        tags.setColor(entity.getColor());
        tags.setUser_id(entity.getUser_id());
        return tags;
    }

    private TagsEntity toEntity(Tags tags) {
        TagsEntity entity = new TagsEntity();
        entity.setId(tags.getId());
        entity.setNome(tags.getNome());
        entity.setDescricao(tags.getDescricao());
        entity.setColor(tags.getColor());
        entity.setUser_id(tags.getUser_id());
        return entity;
    }
}
