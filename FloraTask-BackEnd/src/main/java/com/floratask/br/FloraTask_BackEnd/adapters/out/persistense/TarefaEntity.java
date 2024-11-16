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

    @ManyToOne
    @JoinColumn(name = "tag_id", nullable = true)
    private TagsEntity tags;

    @Column(name = "user_id", nullable = false)
    private String user_id;

    @Column(name = "prazo", nullable = false)
    private String prazo;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime criado_em;
}
