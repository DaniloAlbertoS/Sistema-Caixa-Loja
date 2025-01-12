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

    public Loja salvar(Loja loja) { // Salva a loja e retorna o objeto salvo com o ID atribuído
         Loja lojaSalva = lojaRepository.save(loja); return lojaSalva; }

         public List<Loja> listarTodos() {
            List<Loja> lojas = lojaRepository.findAll();
            lojas.forEach(loja -> System.out.println("Loja ID: " + loja.getIdLoja() + ", Nome: " + loja.getNome()));
            return lojas;
        }
        

        public Loja buscarPorNumeroLoja(int numeroLoja) {
            return lojaRepository.findByNumeroloja(numeroLoja);
        }

    public void excluirPorNumeroLoja(int numeroLoja) {
        Loja loja = lojaRepository.findByNumeroloja(numeroLoja);
        if (loja != null) {
            lojaRepository.delete(loja); // Exclui usando o objeto retornado
        }
    }

    public boolean numerolojaJaExiste(int numeroloja) {
        return lojaRepository.findByNumeroloja(numeroloja) != null;
    }
    
}
