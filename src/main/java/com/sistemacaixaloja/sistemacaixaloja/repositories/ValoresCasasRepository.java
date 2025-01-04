package com.sistemacaixaloja.sistemacaixaloja.repositories;

import com.sistemacaixaloja.sistemacaixaloja.models.ValoresCasas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface ValoresCasasRepository extends JpaRepository<ValoresCasas, Integer> {
    List<ValoresCasas> findByGerenciaIdgerencia(int idGerencia);
    List<ValoresCasas> findByData(Date data);
}
