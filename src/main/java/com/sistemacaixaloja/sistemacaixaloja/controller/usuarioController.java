package com.sistemacaixaloja.sistemacaixaloja.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.sistemacaixaloja.sistemacaixaloja.models.Financeiro;
import com.sistemacaixaloja.sistemacaixaloja.models.Gerencia;
import com.sistemacaixaloja.sistemacaixaloja.repositories.FinanceiroRepository;
import com.sistemacaixaloja.sistemacaixaloja.repositories.GerenciaRepository;
import com.sistemacaixaloja.sistemacaixaloja.services.FinanceiroService;
import com.sistemacaixaloja.sistemacaixaloja.services.GerenciaService;

@RestController
@RequestMapping("/api/usuarios")
public class usuarioController {

    @Autowired
    private FinanceiroService financeiroService;

    @Autowired
    private GerenciaService gerenciaService;

    @PostMapping("/financeiro")
    public ResponseEntity<String> cadastrarFinanceiro(@RequestBody Financeiro financeiro) {
        if (financeiroService.matriculaJaExiste(financeiro.getMatricula())) {
            return ResponseEntity.badRequest().body("Erro: Matrícula já cadastrada no sistema.");
        }
        financeiroService.salvar(financeiro);
        return ResponseEntity.ok("Colaborador financeiro cadastrado com sucesso.");
    }

    @PostMapping("/gerencia")
    public ResponseEntity<String> cadastrarGerencia(@RequestBody Gerencia gerencia) {
        if (gerenciaService.matriculaJaExiste(gerencia.getMatricula())) {
            return ResponseEntity.badRequest().body("Erro: Matrícula já cadastrada no sistema.");
        }
        gerenciaService.salvar(gerencia);
        return ResponseEntity.ok("Colaborador de gerência cadastrado com sucesso.");
    
    }

    @GetMapping("/usuario-logado/{matricula}")
public ResponseEntity<?> getUsuarioLogado(@PathVariable int matricula) {
    // Busca na tabela Financeiro
    Financeiro financeiro = financeiroService.buscarPorMatricula(matricula);
    if (financeiro != null) {
        return ResponseEntity.ok(financeiro);
    }

    // Busca na tabela Gerência
    Gerencia gerencia = gerenciaService.buscarPorMatricula(matricula);
    if (gerencia != null) {
        return ResponseEntity.ok(gerencia);
    }

    // Caso o usuário não seja encontrado
    return ResponseEntity.status(404).body("Usuário não encontrado.");
}

    }
 