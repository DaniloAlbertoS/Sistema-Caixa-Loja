package com.sistemacaixaloja.sistemacaixaloja.repositories;

import com.sistemacaixaloja.sistemacaixaloja.models.Gerencia;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GerenciaRepository extends JpaRepository<Gerencia, Integer> {
    Gerencia findByMatriculaAndCpf(int matricula, String cpf);

    Optional<Gerencia> findByMatricula(int matricula);
}
