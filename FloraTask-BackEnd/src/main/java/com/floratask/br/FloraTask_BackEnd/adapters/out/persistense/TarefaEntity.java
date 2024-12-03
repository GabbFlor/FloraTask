package com.floratask.br.FloraTask_BackEnd.adapters.out.persistense;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Data
@Entity
@Table(name = "tarefas")
public class TarefaEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name = "nome", nullable = false)
    private String nome;

    @Column(name = "detalhes", nullable = false)
    private String detalhes;

    @ManyToOne(optional = true)
    @JoinColumn(name = "tag_id", nullable = true)
    private TagsEntity tags;

    @Column(name = "userId", nullable = false)
    private String userId;

    @Column(name = "prazo", nullable = false)
    private String prazo;

    @Column(name = "isCompleted", nullable = false, columnDefinition = "boolean default false")
    private Boolean isCompleted = false;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime criado_em;
}
