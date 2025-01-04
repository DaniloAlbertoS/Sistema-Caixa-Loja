package com.sistemacaixaloja.sistemacaixaloja.models;

import jakarta.persistence.*;

@Entity
@IdClass(FinanceiroLojaId.class)
@Table(name = "financeiro_loja")
public class FinanceiroLoja {

    @Id
    @ManyToOne
    @JoinColumn(name = "financeiro_idfinanceiro")
    private Financeiro financeiro;

    @Id
    @ManyToOne
    @JoinColumn(name = "loja_idloja")
    private Loja loja;

    public FinanceiroLoja() {
    }

    public FinanceiroLoja(Financeiro financeiro, Loja loja) {
        this.financeiro = financeiro;
        this.loja = loja;
    }

    // Getters e Setters
    public Financeiro getFinanceiro() {
        return financeiro;
    }

    public void setFinanceiro(Financeiro financeiro) {
        this.financeiro = financeiro;
    }

    public Loja getLoja() {
        return loja;
    }

    public void setLoja(Loja loja) {
        this.loja = loja;
    }
}
