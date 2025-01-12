package com.sistemacaixaloja.sistemacaixaloja.repositories;

import com.sistemacaixaloja.sistemacaixaloja.models.Loja;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LojaRepository extends JpaRepository<Loja, Integer> {
    Loja findByNumeroloja(int numeroloja); // Método para buscar loja pelo número da loja
    void deleteByNumeroloja(int numeroloja); // Adiciona exclusão direta pelo número da loja
}



