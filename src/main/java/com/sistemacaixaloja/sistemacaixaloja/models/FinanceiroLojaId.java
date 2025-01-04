package com.sistemacaixaloja.sistemacaixaloja.models;

import java.io.Serializable;
import java.util.Objects;

public class FinanceiroLojaId implements Serializable {
    private int financeiro; // Deve corresponder ao ID do financeiro
    private int loja;       // Deve corresponder ao ID da loja

    public FinanceiroLojaId() {
    }

    public FinanceiroLojaId(int financeiro, int loja) {
        this.financeiro = financeiro;
        this.loja = loja;
    }

    // Getters e Setters
    public int getFinanceiro() {
        return financeiro;
    }

    public void setFinanceiro(int financeiro) {
        this.financeiro = financeiro;
    }

    public int getLoja() {
        return loja;
    }

    public void setLoja(int loja) {
        this.loja = loja;
    }

    // Sobrescrevendo equals e hashCode
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        FinanceiroLojaId that = (FinanceiroLojaId) o;
        return financeiro == that.financeiro && loja == that.loja;
    }

    @Override
    public int hashCode() {
        return Objects.hash(financeiro, loja);
    }
}
