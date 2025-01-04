package com.sistemacaixaloja.sistemacaixaloja.services;

import com.sistemacaixaloja.sistemacaixaloja.models.ValoresCasas;
import com.sistemacaixaloja.sistemacaixaloja.repositories.ValoresCasasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class ValoresCasasService {

    @Autowired
    private ValoresCasasRepository valoresCasasRepository;

    public ValoresCasas salvar(ValoresCasas valoresCasas) {
        return valoresCasasRepository.save(valoresCasas);
    }

    public List<ValoresCasas> listarTodos() {
        return valoresCasasRepository.findAll();
    }

    public ValoresCasas buscarPorId(int id) {
        return valoresCasasRepository.findById(id).orElse(null);
    }

    public void excluirPorId(int id) {
        valoresCasasRepository.deleteById(id);
    }

    public List<ValoresCasas> buscarPorData(Date data) {
        return valoresCasasRepository.findByData(data);
    }
}
