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

    @PostMapping public ResponseEntity<Loja> salvar(@RequestBody Loja loja) { System.out.println("Recebendo dados da loja: " + loja); 
    if (lojaService.numerolojaJaExiste(loja.getNumeroloja())) { 
        System.out.println("Erro: Número da loja já cadastrado."); 
        return ResponseEntity.badRequest().body(null); } 
        Loja lojaSalva = lojaService.salvar(loja); 
        System.out.println("Loja cadastrada com sucesso."); 
        return ResponseEntity.ok(lojaSalva); 
    }

    @GetMapping
    public ResponseEntity<List<Loja>> listarTodos() {
        List<Loja> lojas = lojaService.listarTodos();
        lojas.forEach(loja -> System.out.println("Loja ID: " + loja.getIdLoja() + ", Nome: " + loja.getNome()));
        return ResponseEntity.ok(lojas);
    }
    


    @GetMapping("/{numeroLoja}")
    public ResponseEntity<Loja> buscarPorNumeroLoja(@PathVariable int numeroLoja) {
        Loja loja = lojaService.buscarPorNumeroLoja(numeroLoja);
        if (loja == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(loja);
    }

    @DeleteMapping("/{numeroLoja}")
    public ResponseEntity<Void> excluirPorNumeroLoja(@PathVariable int numeroLoja) {
        Loja loja = lojaService.buscarPorNumeroLoja(numeroLoja);
        if (loja == null) {
            return ResponseEntity.notFound().build();
        }
        lojaService.excluirPorNumeroLoja(numeroLoja);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{numeroLoja}")
    public ResponseEntity<?> atualizarLoja(@PathVariable int numeroLoja, @RequestBody Loja lojaAtualizada) {
        System.out.println("Requisição recebida para atualizar loja com número: " + numeroLoja);
        System.out.println("Dados recebidos: " + lojaAtualizada);
    
        Loja loja = lojaService.buscarPorNumeroLoja(numeroLoja);
        if (loja == null) {
            System.out.println("Loja não encontrada para o número: " + numeroLoja);
            return ResponseEntity.status(404).body("Loja não encontrada.");
        }
    
        // Atualiza os campos da loja
        loja.setNome(lojaAtualizada.getNome());
        loja.setEndereco(lojaAtualizada.getEndereco());
        loja.setCidade(lojaAtualizada.getCidade());
        loja.setTelefone(lojaAtualizada.getTelefone());
        loja.setEmail(lojaAtualizada.getEmail());
        loja.setHorario_funcionamento(lojaAtualizada.getHorario_funcionamento());
        loja.setCnpj(lojaAtualizada.getCnpj());
    
        Loja lojaSalva = lojaService.salvar(loja);
        System.out.println("Loja atualizada com sucesso: " + lojaSalva);
    
        return ResponseEntity.ok("Loja atualizada com sucesso.");
    }
    
    }



