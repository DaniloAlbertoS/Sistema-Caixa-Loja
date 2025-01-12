package com.sistemacaixaloja.sistemacaixaloja.controller;

import com.sistemacaixaloja.sistemacaixaloja.dto.UsuarioLogadoDTO;
import com.sistemacaixaloja.sistemacaixaloja.models.Financeiro;
import com.sistemacaixaloja.sistemacaixaloja.models.Gerencia;
import com.sistemacaixaloja.sistemacaixaloja.services.UsuarioService;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/login")
public class LoginController {

   /* @Autowired
    private UsuarioService usuarioService;

    @PostMapping
    public ResponseEntity<?> login(@RequestParam int matricula, @RequestParam String cpf) {
        String tipoUsuario = usuarioService.verificarTipoUsuario(matricula, cpf);

        if ("Financeiro".equals(tipoUsuario)) {
            return ResponseEntity.ok("Bem-vindo ao sistema financeiro.");
        } else if ("Gerencia".equals(tipoUsuario)) {
            return ResponseEntity.ok("Bem-vindo ao sistema de gerência.");
        } else {
            return ResponseEntity.status(401).body("Usuário não encontrado.");
        }
    }*/

     @Autowired
    private UsuarioService usuarioService;

  /*  @PostMapping
    public ResponseEntity<?> login(@RequestParam int matricula, @RequestParam String cpf) {
        UsuarioLogadoDTO usuarioLogado = usuarioService.verificarTipoUsuario(matricula, cpf);

        if (usuarioLogado != null) {
            return ResponseEntity.ok(usuarioLogado);
        } else {
            return ResponseEntity.status(401).body("Usuário não encontrado.");
        }
    }*/

    @PostMapping
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
        int matricula = Integer.parseInt(loginData.get("matricula"));
        String cpf = loginData.get("cpf");
    
        UsuarioLogadoDTO usuario = usuarioService.verificarTipoUsuario(matricula, cpf);
    
        if (usuario != null) {
            return ResponseEntity.ok(usuario);
        } else {
            return ResponseEntity.status(401).body("Usuário ou senha inválidos.");
        }
    }
    


}
