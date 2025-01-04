package com.sistemacaixaloja.sistemacaixaloja.controller;

import com.sistemacaixaloja.sistemacaixaloja.models.Financeiro;
import com.sistemacaixaloja.sistemacaixaloja.services.FinanceiroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/financeiro")
public class FinanceiroController {

    @Autowired
    private FinanceiroService financeiroService;

    @PostMapping
    public ResponseEntity<Financeiro> salvar(@RequestBody Financeiro financeiro) {
        return ResponseEntity.ok(financeiroService.salvar(financeiro));
    }

    @GetMapping
    public ResponseEntity<List<Financeiro>> listarTodos() {
        return ResponseEntity.ok(financeiroService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Financeiro> buscarPorId(@PathVariable int id) {
        Financeiro financeiro = financeiroService.buscarPorId(id);
        if (financeiro == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(financeiro);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirPorId(@PathVariable int id) {
        financeiroService.excluirPorId(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/matricula/{matricula}")
    public ResponseEntity<Financeiro> buscarPorMatricula(@PathVariable int matricula) {
        Financeiro financeiro = financeiroService.buscarPorMatricula(matricula);
        if (financeiro == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(financeiro);
    }
}
