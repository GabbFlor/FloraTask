package com.floratask.br.FloraTask_BackEnd.adapters.in.web;

import com.floratask.br.FloraTask_BackEnd.application.domain.Tags;
import com.floratask.br.FloraTask_BackEnd.application.ports.in.TagsUseCases;
import com.mysql.cj.exceptions.DataTruncationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.DataTruncation;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/tags")
@CrossOrigin(origins = "*", maxAge = 3600)
public class TagsController {

    @Autowired
    private TagsUseCases tagsUseCases;

    @PostMapping()
    public ResponseEntity<?> adicionarTag(@RequestBody Tags tags) {
        try {
            Tags resultado = tagsUseCases.PostTag(tags);
            return ResponseEntity.status(HttpStatus.CREATED).body(tags);
        } catch (DataIntegrityViolationException e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("Mensagem: ", "Algum dos campos inseridos estoura o limite de caracteres!");
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(errorResponse);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("Mensagem: ", "Erro interno no servidor: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @GetMapping("/getTagById/{id}/{userId}")
    public ResponseEntity<?> pegarTagPorId(@PathVariable(value = "id") String id, @PathVariable(value = "userId") String userId) {
        try {
            Tags tags = tagsUseCases.getTagByIdAndUserId(id, userId);
            return ResponseEntity.status(HttpStatus.OK).body(tags);
        } catch (NoSuchElementException e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("Mensagem: ", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("Mensagem: ", "Erro interno no servidor: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @GetMapping("/getByUserId/{userId}")
    public ResponseEntity<List<Tags>> pegarTagsDoUsuario(@PathVariable(value = "userId") String userId) {
        try {
            List<Tags> tagsList = tagsUseCases.getTagByUserId(userId);

            if (tagsList.isEmpty()) {
                ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
            }

            return ResponseEntity.ok(tagsList);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> editarTag(@PathVariable(value = "id") String id, @RequestBody Tags tagDetails) {
        try {
            Tags tags = tagsUseCases.updateTag(tagDetails, id);
            return ResponseEntity.status(HttpStatus.OK).body(tags);
        } catch (NoSuchElementException e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("Mensagem: ", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        } catch (DataIntegrityViolationException e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("Mensagem: ", "Algum dos campos inseridos estoura o limite de caracteres!");
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(errorResponse);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("Mensagem: ", "Erro interno no servidor: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @DeleteMapping("/{userId}/{id}")
    public ResponseEntity<Map<String, String>> deleteTag(@PathVariable(value = "id") String id, @PathVariable(value = "userId") String userId) {
        try {
            List<Tags> todasTags = tagsUseCases.getTagByUserId(userId);

            boolean idExiste = todasTags.stream().anyMatch(tags -> tags.getId().equals(id));

            if (!idExiste) {
                Map<String, String> errorRepsponse = new HashMap<>();
                errorRepsponse.put("Mensagem", "Erro: Tarefa com o id " + id + " não foi encontrada");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorRepsponse);
            }

            tagsUseCases.deleteTag(id);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Tag com o id: " + id + " foi deletada com sucesso");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("Mensagem", "Erro interno no servidor: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
}
