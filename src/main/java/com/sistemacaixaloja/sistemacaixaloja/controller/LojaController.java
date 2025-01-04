package com.sistemacaixaloja.sistemacaixaloja.controller;

import com.sistemacaixaloja.sistemacaixaloja.models.Loja;
import com.sistemacaixaloja.sistemacaixaloja.services.LojaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lojas")
public class LojaController {

    @Autowired
    private LojaService lojaService;

    @PostMapping
    public ResponseEntity<Loja> salvar(@RequestBody Loja loja) {
        return ResponseEntity.ok(lojaService.salvar(loja));
    }

    @GetMapping
    public ResponseEntity<List<Loja>> listarTodos() {
        return ResponseEntity.ok(lojaService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Loja> buscarPorId(@PathVariable int id) {
        Loja loja = lojaService.buscarPorId(id);
        if (loja == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(loja);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirPorId(@PathVariable int id) {
        lojaService.excluirPorId(id);
        return ResponseEntity.noContent().build();
    }
}
