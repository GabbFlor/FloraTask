package com.floratask.br.FloraTask_BackEnd.adapters.out.persistense;

import com.floratask.br.FloraTask_BackEnd.application.domain.Tags;
import com.floratask.br.FloraTask_BackEnd.application.ports.out.TagsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
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
    public List<Tags> findByUserId(String userId) {
        return tagsJpaRepository.findByUserId(userId).stream().map(this::toDomain).collect(Collectors.toList());
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
        tags.setUserId(entity.getUserId());

//        campo para verificar o valor de "criado_em" e evitar NullPointerException

        if (entity.getCriado_em() != null) {
            tags.setCriado_em(String.valueOf(entity.getCriado_em()));
        }

        return tags;
    }

    private TagsEntity toEntity(Tags tags) {
        TagsEntity entity = new TagsEntity();
        entity.setId(tags.getId());
        entity.setNome(tags.getNome());
        entity.setDescricao(tags.getDescricao());
        entity.setColor(tags.getColor());
        entity.setUserId(tags.getUserId());

//        campo para verificar o valor de "criado_em" e evitar NullPointerException

        if (tags.getCriado_em() != null && !tags.getCriado_em().isEmpty()) {
            try {
                entity.setCriado_em(LocalDateTime.parse(tags.getCriado_em()));
            } catch (Exception e) {
                System.err.println("Erro ao converter 'criado_em' para LocalDateTime: " + e.getMessage());
                entity.setCriado_em(null);
            }
        }

        return entity;
    }
}
