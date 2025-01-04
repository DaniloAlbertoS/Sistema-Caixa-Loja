package com.sistemacaixaloja.sistemacaixaloja.services;

import com.sistemacaixaloja.sistemacaixaloja.models.Loja;
import com.sistemacaixaloja.sistemacaixaloja.repositories.LojaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LojaService {

    @Autowired
    private LojaRepository lojaRepository;

    public Loja salvar(Loja loja) {
        return lojaRepository.save(loja);
    }

    public List<Loja> listarTodos() {
        return lojaRepository.findAll();
    }

    public Loja buscarPorId(int id) {
        return lojaRepository.findById(id).orElse(null);
    }

    public void excluirPorId(int id) {
        lojaRepository.deleteById(id);
    }
}
