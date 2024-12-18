package com.floratask.br.FloraTask_BackEnd.adapters.in.web;

import com.floratask.br.FloraTask_BackEnd.application.domain.Tarefa;
import com.floratask.br.FloraTask_BackEnd.application.ports.in.TarefaUseCases;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/tarefa")
@CrossOrigin(origins = "*", maxAge = 3600)
public class TarefaController {

    @Autowired
    private TarefaUseCases tarefaUseCases;

    @PostMapping()
    public ResponseEntity<?> adicionarTarefa(@RequestBody Tarefa tarefa) {
        try {
            Tarefa resultado = tarefaUseCases.postTarefa(tarefa);
            return ResponseEntity.status(HttpStatus.CREATED).body(tarefa);
        } catch (DataIntegrityViolationException e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("Mensagem: ", "Não foi possível encontrar a tag com esse id.");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("Mensagem: ", "Erro interno no servidor: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

//    pegar apenas uma tarefa pelo id dela
    @GetMapping("/getById/{id}")
    public ResponseEntity<?> pegarTarefaPorId(@PathVariable(value = "id") String id) {
        try {
            Tarefa tarefa = tarefaUseCases.getTarefaById(id);
            return ResponseEntity.status(HttpStatus.OK).body(tarefa);
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

//    barra de pesquisa - pesquisar todas as tarefas com tal nome de tal usuário
    @GetMapping("/getByNome/{nome}/userId/{userId}")
    public ResponseEntity<List<Tarefa>> pegarTarefaPorNome(@PathVariable(value = "nome") String nome, @PathVariable(value = "userId") String userId) {
        try {
            List<Tarefa> tarefaList = tarefaUseCases.getTarefaByNome(nome, userId);

            if(tarefaList.isEmpty()) {
                ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
            }

            return ResponseEntity.ok(tarefaList);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

//    pegar todas as tarefas completas de um determinado usuário
    @GetMapping("/getCompletedByUserId/{userId}")
    public ResponseEntity<List<Tarefa>> pegarTarefasCompletadasDoUsuario(@PathVariable(value = "userId") String userId) {
        try {
            List<Tarefa> tarefaList = tarefaUseCases.getTarefaCompletedByUserId(userId);

            if (tarefaList.isEmpty()) {
                ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
            }

            return ResponseEntity.ok(tarefaList);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    //    pegar todas as tarefas incompletas de um determinado usuário
    @GetMapping("/getIncompletedByUserId/{userId}")
    public ResponseEntity<List<Tarefa>> pegarTarefasIncompletasDoUsuario(@PathVariable(value = "userId") String userId) {
        try {
            List<Tarefa> tarefaList = tarefaUseCases.getTarefaIncompletedByUserId(userId);

            if (tarefaList.isEmpty()) {
                ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
            }

            return ResponseEntity.ok(tarefaList);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> editarTarefa(@PathVariable(value = "id") String id, @RequestBody Tarefa tarefaDetails) {
        try {
            Tarefa tarefa = tarefaUseCases.updateTarefa(tarefaDetails, id);
            return ResponseEntity.status(HttpStatus.OK).body(tarefa);
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

    @DeleteMapping("/{userId}/{id}")
    public ResponseEntity<Map<String, String>> deleteTarefa(@PathVariable(value = "id") String id, @PathVariable(value = "userId") String userId) {
        try {
            List<Tarefa> todasTarefas = tarefaUseCases.getTarefaCompletedByUserId(userId);

            boolean idExiste = todasTarefas.stream().anyMatch(tarefa -> tarefa.getId().equals(id));

            if (!idExiste) {
                Map<String, String> errorRepsponse = new HashMap<>();
                errorRepsponse.put("Mensagem", "Erro: Tarefa com o id " + id + " não foi encontrada");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorRepsponse);
            }

            tarefaUseCases.deleteTarefa(id);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Tarefa com o id: " + id + " foi deletada com sucesso");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("Mensagem", "Erro interno no servidor: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
}
