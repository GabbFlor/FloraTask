package com.floratask.br.FloraTask_BackEnd.adapters.out.persistense;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

@Data
@Entity
@Table(name = "tags")
public class TagsEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name = "nome", nullable = false)
    private String Nome;

    @Column(name = "descricao", nullable = false)
    private String Descricao;

    @Column(name = "color", nullable = false)
    private String color;

    @Column(name = "userId", nullable = false)
    private String userId;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime criado_em;
}
