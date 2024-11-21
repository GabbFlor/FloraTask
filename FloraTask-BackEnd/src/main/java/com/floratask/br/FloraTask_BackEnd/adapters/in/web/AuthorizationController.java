package com.floratask.br.FloraTask_BackEnd.adapters.in.web;

import com.floratask.br.FloraTask_BackEnd.adapters.out.persistense.UsersEntity;
import com.floratask.br.FloraTask_BackEnd.adapters.out.persistense.UsersJpaRepository;
import com.floratask.br.FloraTask_BackEnd.application.DTO.AuthenticationDTO;
import com.floratask.br.FloraTask_BackEnd.application.DTO.LoginResponseDTO;
import com.floratask.br.FloraTask_BackEnd.application.DTO.RegistroDTO;
import com.floratask.br.FloraTask_BackEnd.application.DTO.UsersInfoDTO;
import com.floratask.br.FloraTask_BackEnd.application.domain.Users;
import com.floratask.br.FloraTask_BackEnd.application.infra.TokenService;
import com.floratask.br.FloraTask_BackEnd.application.ports.in.UsersUseCase;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AuthorizationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UsersJpaRepository usersJpaRepository;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private UsersUseCase usersUseCase;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid AuthenticationDTO data) {
        try {
            //        protegendo a senha com hash
            var emailPassword = new UsernamePasswordAuthenticationToken(data.email(), data.password());
            var auth = this.authenticationManager.authenticate(emailPassword);

            var token = tokenService.generateToken((UsersEntity) auth.getPrincipal());

            return ResponseEntity.status(HttpStatus.OK).body(new LoginResponseDTO(token));
        } catch (BadCredentialsException e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("Mensagem", "Nome de usuário ou senha incorretos.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("Mensagem", "Erro interno no servidor: " + e.getMessage() + e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @PostMapping("/registro")
    public ResponseEntity registro(@RequestBody @Valid RegistroDTO data) {
        try {
            String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());
//            System.out.println("Senha original: " + data.password());
//            System.out.println("Senha encriptada: " + encryptedPassword);
            UsersEntity newUser = new UsersEntity(data.email(), data.nome(), encryptedPassword, data.role());

            this.usersJpaRepository.save(newUser);

            var emailPassword = new UsernamePasswordAuthenticationToken(data.email(), data.password());
            var auth = this.authenticationManager.authenticate(emailPassword);

            var token = tokenService.generateToken((UsersEntity) auth.getPrincipal());

            return ResponseEntity.status(HttpStatus.OK).body(new LoginResponseDTO(token));
        } catch (DataIntegrityViolationException e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("Mensagem", "Erro, já existe um usuário com o email " + data.email());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(errorResponse);
        } catch (Exception e) {
//            Map<String, String> errorResponse = new HashMap<>();
//            errorResponse.put("Mensagem", "Erro interno no servidor: " + e.getMessage() + e);
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);

            e.printStackTrace();
            return ResponseEntity.internalServerError().body(null);
        }
    }

    @GetMapping("/info")
    public ResponseEntity<?> informacoesDoUser() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            String login = authentication.getName();

            Users users = usersUseCase.getOneUser(login);

            UsersInfoDTO userResponse = new UsersInfoDTO(users.getId(), users.getEmail(), users.getNome(), users.getRole());

            return ResponseEntity.status(HttpStatus.OK).body(userResponse);
        } catch (NoSuchElementException e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("Mensagem", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("Mensagem", "Erro interno no servidor: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
}
