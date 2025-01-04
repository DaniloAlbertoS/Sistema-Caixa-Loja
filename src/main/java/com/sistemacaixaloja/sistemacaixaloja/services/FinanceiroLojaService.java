package com.sistemacaixaloja.sistemacaixaloja.services;

import com.sistemacaixaloja.sistemacaixaloja.models.FinanceiroLoja;
import com.sistemacaixaloja.sistemacaixaloja.repositories.FinanceiroLojaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FinanceiroLojaService {

    @Autowired
    private FinanceiroLojaRepository financeiroLojaRepository;

    public FinanceiroLoja salvar(FinanceiroLoja financeiroLoja) {
        return financeiroLojaRepository.save(financeiroLoja);
    }

    public List<FinanceiroLoja> listarTodos() {
        return financeiroLojaRepository.findAll();
    }

    public void excluir(FinanceiroLoja financeiroLoja) {
        financeiroLojaRepository.delete(financeiroLoja);
    }
}
