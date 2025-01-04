package com.sistemacaixaloja.sistemacaixaloja.services;

import com.sistemacaixaloja.sistemacaixaloja.models.Gerencia;
import com.sistemacaixaloja.sistemacaixaloja.repositories.GerenciaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GerenciaService {

    @Autowired
    private GerenciaRepository gerenciaRepository;

    public Gerencia salvar(Gerencia gerencia) {
        return gerenciaRepository.save(gerencia);
    }

    public List<Gerencia> listarTodos() {
        return gerenciaRepository.findAll();
    }

    public Gerencia buscarPorId(int id) {
        return gerenciaRepository.findById(id).orElse(null);
    }

    public void excluirPorId(int id) {
        gerenciaRepository.deleteById(id);
    }

    public Gerencia buscarPorMatricula(int matricula) {
        return gerenciaRepository.findByMatricula(matricula).orElse(null);
    }
}
