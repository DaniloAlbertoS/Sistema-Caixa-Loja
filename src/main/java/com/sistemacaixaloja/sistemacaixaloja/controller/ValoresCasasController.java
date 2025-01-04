package com.sistemacaixaloja.sistemacaixaloja.controller;

import com.sistemacaixaloja.sistemacaixaloja.models.ValoresCasas;
import com.sistemacaixaloja.sistemacaixaloja.services.ValoresCasasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/valores")
public class ValoresCasasController {

    @Autowired
    private ValoresCasasService valoresCasasService;

    @PostMapping
    public ResponseEntity<ValoresCasas> salvar(@RequestBody ValoresCasas valoresCasas) {
        return ResponseEntity.ok(valoresCasasService.salvar(valoresCasas));
    }

    @GetMapping
    public ResponseEntity<List<ValoresCasas>> listarTodos() {
        return ResponseEntity.ok(valoresCasasService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ValoresCasas> buscarPorId(@PathVariable int id) {
        ValoresCasas valoresCasas = valoresCasasService.buscarPorId(id);
        if (valoresCasas == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(valoresCasas);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirPorId(@PathVariable int id) {
        valoresCasasService.excluirPorId(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/data")
    public ResponseEntity<List<ValoresCasas>> buscarPorData(@RequestParam Date data) {
        return ResponseEntity.ok(valoresCasasService.buscarPorData(data));
    }
}
