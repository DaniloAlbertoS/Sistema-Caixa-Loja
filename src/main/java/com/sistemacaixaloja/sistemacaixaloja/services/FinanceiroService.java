package com.sistemacaixaloja.sistemacaixaloja.services;

import com.sistemacaixaloja.sistemacaixaloja.models.Financeiro;
import com.sistemacaixaloja.sistemacaixaloja.repositories.FinanceiroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FinanceiroService {

    @Autowired
    private FinanceiroRepository financeiroRepository;

    public Financeiro salvar(Financeiro financeiro) {
        return financeiroRepository.save(financeiro);
    }

    public List<Financeiro> listarTodos() {
        return financeiroRepository.findAll();
    }

    public Financeiro buscarPorId(int id) {
        return financeiroRepository.findById(id).orElse(null);
    }

    public void excluirPorId(int id) {
        financeiroRepository.deleteById(id);
    }

    public Financeiro buscarPorMatricula(int matricula) {
        return financeiroRepository.findByMatricula(matricula).orElse(null);
    }
}
