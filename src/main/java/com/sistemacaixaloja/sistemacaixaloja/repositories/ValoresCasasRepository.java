package com.sistemacaixaloja.sistemacaixaloja.repositories;

import com.sistemacaixaloja.sistemacaixaloja.models.ValoresCasas;

import jakarta.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface ValoresCasasRepository extends JpaRepository<ValoresCasas, Integer> {
    List<ValoresCasas> findByGerenciaIdgerencia(int idGerencia);
    
    @Transactional
    @Modifying
    @Query("DELETE FROM ValoresCasas v WHERE v.idvalorescasa IN :ids")
    void deleteAllById(@Param("ids") List<Integer> ids);


    @Query("SELECT v FROM ValoresCasas v WHERE v.valor_caixas = :valor OR v.valor_cofre = :valor OR v.valor_despesa = :valor")
    List<ValoresCasas> findByValorCaixas(@Param("valor") double valor);

   
    @Query("SELECT v FROM ValoresCasas v WHERE v.data = :data")
    List<ValoresCasas> findByData(@Param("data") Date data);
}
