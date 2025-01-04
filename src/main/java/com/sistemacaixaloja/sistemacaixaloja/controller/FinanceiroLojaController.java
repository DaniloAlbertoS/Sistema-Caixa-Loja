package com.sistemacaixaloja.sistemacaixaloja.controller;

import com.sistemacaixaloja.sistemacaixaloja.models.FinanceiroLoja;
import com.sistemacaixaloja.sistemacaixaloja.services.FinanceiroLojaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/financeiro-loja")
public class FinanceiroLojaController {

    @Autowired
    private FinanceiroLojaService financeiroLojaService;

    @PostMapping
    public ResponseEntity<FinanceiroLoja> salvar(@RequestBody FinanceiroLoja financeiroLoja) {
        return ResponseEntity.ok(financeiroLojaService.salvar(financeiroLoja));
    }

    @GetMapping
    public ResponseEntity<List<FinanceiroLoja>> listarTodos() {
        return ResponseEntity.ok(financeiroLojaService.listarTodos());
    }

    @DeleteMapping
    public ResponseEntity<Void> excluir(@RequestBody FinanceiroLoja financeiroLoja) {
        financeiroLojaService.excluir(financeiroLoja);
        return ResponseEntity.noContent().build();
    }
}
