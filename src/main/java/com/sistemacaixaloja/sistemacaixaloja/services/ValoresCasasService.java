package com.sistemacaixaloja.sistemacaixaloja.services;

import com.sistemacaixaloja.sistemacaixaloja.models.ValoresCasas;
import com.sistemacaixaloja.sistemacaixaloja.repositories.ValoresCasasRepository;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
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
   
   
    @Transactional
    public void excluirMultiplos(List<Integer> ids) {
        valoresCasasRepository.deleteAllById(ids);
    }
    
    

    public List<ValoresCasas> buscarPorData(String data) {
        try {
            System.out.println("Filtro de data recebido: " + data); // Log para verificar o valor recebido
            DateFormat format = new SimpleDateFormat("yyyy-MM-dd");
            Date parsedDate = format.parse(data);
            return valoresCasasRepository.findByData(parsedDate);
        } catch (ParseException e) {
            throw new RuntimeException("Data em formato inválido. Use o formato 'yyyy-MM-dd'.", e);
        }
    }
    
    

    public List<ValoresCasas> buscarPorValorCaixas(double valor) {
        return valoresCasasRepository.findByValorCaixas(valor);
    }
}
