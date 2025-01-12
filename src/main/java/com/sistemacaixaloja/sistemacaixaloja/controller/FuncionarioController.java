package com.sistemacaixaloja.sistemacaixaloja.controller;

import com.sistemacaixaloja.sistemacaixaloja.models.Financeiro;
import com.sistemacaixaloja.sistemacaixaloja.models.Gerencia;
import com.sistemacaixaloja.sistemacaixaloja.services.FinanceiroService;
import com.sistemacaixaloja.sistemacaixaloja.services.GerenciaService;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/funcionarios")
public class FuncionarioController {

    @Autowired
    private FinanceiroService financeiroService;

    @Autowired
    private GerenciaService gerenciaService;

    @GetMapping("/matricula/{matricula}")
    public ResponseEntity<?> buscarPorMatricula(@PathVariable int matricula) {
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

        // Caso não encontre em nenhuma tabela
        return ResponseEntity.status(404).body("Funcionário não encontrado.");
    }

    @PutMapping("/matricula/{matricula}")
    public ResponseEntity<?> atualizarPorMatricula(@PathVariable int matricula, @RequestBody Map<String, Object> dadosAtualizados) {
        // Tentar atualizar na tabela Financeiro
        Financeiro financeiro = financeiroService.buscarPorMatricula(matricula);
        if (financeiro != null) {
            financeiro.setNome((String) dadosAtualizados.get("nome"));
            financeiro.setCargo((String) dadosAtualizados.get("cargo"));
            financeiro.setCpf((String) dadosAtualizados.get("cpf"));
            financeiro.setAtivo((boolean) dadosAtualizados.get("ativo"));
            financeiroService.salvar(financeiro);
            return ResponseEntity.ok("Dados atualizados com sucesso!");
        }

        // Tentar atualizar na tabela Gerência
        Gerencia gerencia = gerenciaService.buscarPorMatricula(matricula);
        if (gerencia != null) {
            gerencia.setNome((String) dadosAtualizados.get("nome"));
            gerencia.setCargo((String) dadosAtualizados.get("cargo"));
            gerencia.setCpf((String) dadosAtualizados.get("cpf"));
            gerencia.setAtivo((boolean) dadosAtualizados.get("ativo"));
            gerenciaService.salvar(gerencia);
            return ResponseEntity.ok("Dados atualizados com sucesso!");
        }

        return ResponseEntity.status(404).body("Funcionário não encontrado.");
    }
}
