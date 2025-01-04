package com.sistemacaixaloja.sistemacaixaloja.repositories;

import com.sistemacaixaloja.sistemacaixaloja.models.Loja;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LojaRepository extends JpaRepository<Loja, Integer> {
    Loja findByNumeroloja(int numeroloja); // Use exatamente o nome da propriedade
}


