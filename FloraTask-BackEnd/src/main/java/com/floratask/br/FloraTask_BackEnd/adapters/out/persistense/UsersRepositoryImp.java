package com.floratask.br.FloraTask_BackEnd.adapters.out.persistense;

import com.floratask.br.FloraTask_BackEnd.application.domain.Users;
import com.floratask.br.FloraTask_BackEnd.application.ports.out.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class UsersRepositoryImp implements UsersRepository {

    @Autowired
    private UsersJpaRepository usersJpaRepository;

    @Override
    public Optional<Users> findByEmail(String email) {
        return usersJpaRepository.findByEmail(email).map(this::toDomain);
    }

    private Users toDomain(UsersEntity entity) {
        Users users = new Users();
        users.setId(entity.getId());
        users.setEmail(entity.getEmail());
        users.setNome(entity.getNome());
        users.setPassword(entity.getPassword());
        users.setRole(entity.getRole());
        return users;
    }

    private UsersEntity toEntity(Users users) {
        UsersEntity entity = new UsersEntity();
        entity.setId(users.getId());
        entity.setEmail(users.getEmail());
        entity.setNome(users.getNome());
        entity.setPassword(users.getPassword());
        entity.setRole(users.getRole());
        return entity;
    }
}
