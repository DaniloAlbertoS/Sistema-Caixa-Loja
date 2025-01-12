package com.sistemacaixaloja.sistemacaixaloja.models;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class FinanceiroLojaId implements Serializable {

    private Integer financeiro;
    private Integer loja;

    public FinanceiroLojaId() {
    }

    public FinanceiroLojaId(Integer financeiro, Integer loja) {
        this.financeiro = financeiro;
        this.loja = loja;
    }

    public Integer getFinanceiro() {
        return financeiro;
    }

    public void setFinanceiro(Integer financeiro) {
        this.financeiro = financeiro;
    }

    public Integer getLoja() {
        return loja;
    }

    public void setLoja(Integer loja) {
        this.loja = loja;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        FinanceiroLojaId that = (FinanceiroLojaId) o;
        return Objects.equals(financeiro, that.financeiro) &&
               Objects.equals(loja, that.loja);
    }

    @Override
    public int hashCode() {
        return Objects.hash(financeiro, loja);
    }
}
