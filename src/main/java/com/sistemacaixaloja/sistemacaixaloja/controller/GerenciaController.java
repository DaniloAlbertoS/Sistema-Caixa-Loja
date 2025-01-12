package com.sistemacaixaloja.sistemacaixaloja.controller;

import com.sistemacaixaloja.sistemacaixaloja.models.Gerencia;
import com.sistemacaixaloja.sistemacaixaloja.services.GerenciaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/gerencia")
public class GerenciaController {

    @Autowired
    private GerenciaService gerenciaService;

    @PostMapping
    public ResponseEntity<Gerencia> salvar(@RequestBody Gerencia gerencia) {
        return ResponseEntity.ok(gerenciaService.salvar(gerencia));
    }

    @GetMapping
    public ResponseEntity<List<Gerencia>> listarTodos() {
        return ResponseEntity.ok(gerenciaService.listarTodos());
    }

    @DeleteMapping("/{id}")
public ResponseEntity<Void> excluirPorId(@PathVariable int id) {
    if (gerenciaService.excluirPorId(id)) {
        return ResponseEntity.noContent().build();
    }
    return ResponseEntity.notFound().build();
}

    


    @GetMapping("/{id}")
    public ResponseEntity<Gerencia> buscarPorId(@PathVariable int id) {
        Gerencia gerencia = gerenciaService.buscarPorId(id);
        if (gerencia == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(gerencia);
    }

    @GetMapping("/matricula/{matricula}")
    public ResponseEntity<Gerencia> buscarPorMatricula(@PathVariable int matricula) {
        Gerencia gerencia = gerenciaService.buscarPorMatricula(matricula);
        if (gerencia == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(gerencia);
    }
}
