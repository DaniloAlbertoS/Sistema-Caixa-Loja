package com.sistemacaixaloja.sistemacaixaloja.services;

import com.sistemacaixaloja.sistemacaixaloja.dto.UsuarioLogadoDTO;
import com.sistemacaixaloja.sistemacaixaloja.models.Financeiro;
import com.sistemacaixaloja.sistemacaixaloja.models.Gerencia;
import com.sistemacaixaloja.sistemacaixaloja.repositories.FinanceiroRepository;
import com.sistemacaixaloja.sistemacaixaloja.repositories.GerenciaRepository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {

   /*   @Autowired
    private FinanceiroRepository financeiroRepository;

    @Autowired
    private GerenciaRepository gerenciaRepository;

    @PersistenceContext
    private EntityManager entityManager;

     public String verificarTipoUsuario(int matricula, String cpf) {
        // Verifica se o usuário é do financeiro
        Query queryFinanceiro = entityManager.createQuery("SELECT f FROM Financeiro f WHERE f.matricula = :matricula AND f.cpf = :cpf");
        queryFinanceiro.setParameter("matricula", matricula);
        queryFinanceiro.setParameter("cpf", cpf);

        List<Financeiro> resultadosFinanceiro = queryFinanceiro.getResultList();
        if (!resultadosFinanceiro.isEmpty()) {
            return "Financeiro";
        }

        // Verifica se o usuário é da gerência
        Query queryGerencia = entityManager.createQuery("SELECT g FROM Gerencia g WHERE g.matricula = :matricula AND g.cpf = :cpf");
        queryGerencia.setParameter("matricula", matricula);
        queryGerencia.setParameter("cpf", cpf);

        List<Gerencia> resultadosGerencia = queryGerencia.getResultList();
        if (!resultadosGerencia.isEmpty()) {
            return "Gerencia";
        }

        return null;
    }
*/

  @PersistenceContext
    private EntityManager entityManager;

    public UsuarioLogadoDTO verificarTipoUsuario(int matricula, String cpf) {
        // Verifica se o usuário é do financeiro
        Query queryFinanceiro = entityManager.createQuery("SELECT f FROM Financeiro f WHERE f.matricula = :matricula AND f.cpf = :cpf");
        queryFinanceiro.setParameter("matricula", matricula);
        queryFinanceiro.setParameter("cpf", cpf);

        List<Financeiro> resultadosFinanceiro = queryFinanceiro.getResultList();
        if (!resultadosFinanceiro.isEmpty()) {
            Financeiro financeiro = resultadosFinanceiro.get(0);
            return new UsuarioLogadoDTO("Financeiro", financeiro.getNome(), financeiro.getMatricula());
        }

        // Verifica se o usuário é da gerência
        Query queryGerencia = entityManager.createQuery("SELECT g FROM Gerencia g WHERE g.matricula = :matricula AND g.cpf = :cpf");
        queryGerencia.setParameter("matricula", matricula);
        queryGerencia.setParameter("cpf", cpf);

        List<Gerencia> resultadosGerencia = queryGerencia.getResultList();
        if (!resultadosGerencia.isEmpty()) {
            Gerencia gerencia = resultadosGerencia.get(0);
            return new UsuarioLogadoDTO("Gerencia", gerencia.getNome(), gerencia.getMatricula());
        }

        // Retorna null se não encontrar o usuário
        return null;
    }
    
}
