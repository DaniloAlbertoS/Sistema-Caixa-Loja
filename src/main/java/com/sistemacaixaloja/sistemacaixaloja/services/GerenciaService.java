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

    public boolean excluirPorId(int id) {
        if (gerenciaRepository.existsById(id)) {
            gerenciaRepository.deleteById(id);
            return true;
        }
        return false;
    }
    

    public Gerencia buscarPorMatricula(int matricula) {
        return gerenciaRepository.findByMatricula(matricula).orElse(null);
    }

    public boolean matriculaJaExiste(int matricula) {
        return gerenciaRepository.existsByMatricula(matricula);
    }
}
