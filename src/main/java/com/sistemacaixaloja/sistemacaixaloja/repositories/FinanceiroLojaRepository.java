package com.sistemacaixaloja.sistemacaixaloja.repositories;

import com.sistemacaixaloja.sistemacaixaloja.models.FinanceiroLoja;
import com.sistemacaixaloja.sistemacaixaloja.models.FinanceiroLojaId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FinanceiroLojaRepository extends JpaRepository<FinanceiroLoja, FinanceiroLojaId> {
}
