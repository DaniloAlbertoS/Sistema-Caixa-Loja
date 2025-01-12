package com.sistemacaixaloja.sistemacaixaloja.controller;

import com.sistemacaixaloja.sistemacaixaloja.models.ValoresCasas;
import com.sistemacaixaloja.sistemacaixaloja.services.ValoresCasasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/valores")
public class ValoresCasasController {

    @Autowired
    private ValoresCasasService valoresCasasService;

    @GetMapping
    public ResponseEntity<List<ValoresCasas>> listarTodos(@RequestParam(required = false) String filter) {
        if (filter != null && !filter.isEmpty()) {
            // Verificar se o filtro é numérico
            try {
                double valor = Double.parseDouble(filter);
                return ResponseEntity.ok(valoresCasasService.buscarPorValorCaixas(valor));
            } catch (NumberFormatException e) {
                // Caso contrário, interpretar como data
                return ResponseEntity.ok(valoresCasasService.buscarPorData(filter));
            }
        }
        return ResponseEntity.ok(valoresCasasService.listarTodos());
    }
    @PostMapping
    public ResponseEntity<ValoresCasas> salvar(@RequestBody ValoresCasas valoresCasas) {
        return ResponseEntity.ok(valoresCasasService.salvar(valoresCasas));
    }

    @DeleteMapping
public ResponseEntity<Void> excluirMultiplos(@RequestBody List<Integer> ids) {
    valoresCasasService.excluirMultiplos(ids);
    return ResponseEntity.noContent().build();
}

}


