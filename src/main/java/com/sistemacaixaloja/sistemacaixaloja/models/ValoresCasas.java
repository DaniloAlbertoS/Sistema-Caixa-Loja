
package com.sistemacaixaloja.sistemacaixaloja.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import java.sql.Time;
import java.util.Date;

@Entity
@Table(name="valores_casa")
public class ValoresCasas {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idvalores_casa;
    
    @Temporal(TemporalType.DATE)
    @Column(nullable = false)
    private Date data;
    
    @Temporal(TemporalType.TIME)
    @Column(nullable = false)
    private Date hora;
    
   @Column(nullable = false)
    private double valor_caixas;

    @Column(nullable = false)
    private double valor_cofre;

    @Column(nullable = false)
    private double valor_despesa = 300.00 ;
    
    @ManyToOne
    @JoinColumn(name="gerencia_casa")
    private Gerencia gerencia;

    public ValoresCasas() {
    }

    public ValoresCasas(Date data, Date hora, double valor_caixas, double valor_cofre, double valor_despesa, Gerencia gerencia) {
        this.data = data;
        this.hora = hora;
        this.valor_caixas = valor_caixas;
        this.valor_cofre = valor_cofre;
        this.valor_despesa = valor_despesa;
        this.gerencia = gerencia;
    }

    public int getIdvalores_casa() {
        return idvalores_casa;
    }

    public void setIdvalores_casa(int idvalores_casa) {
        this.idvalores_casa = idvalores_casa;
    }

    public Date getData() {
        return data;
    }

    public void setData(Date data) {
        this.data = data;
    }

    public Date getHora() {
        return hora;
    }

    public void setHora(Date hora) {
        this.hora = hora;
    }

    public double getValor_caixas() {
        return valor_caixas;
    }

    public void setValor_caixas(double valor_caixas) {
        this.valor_caixas = valor_caixas;
    }

    public double getValor_cofre() {
        return valor_cofre;
    }

    public void setValor_cofre(double valor_cofre) {
        this.valor_cofre = valor_cofre;
    }

    public double getValor_despesa() {
        return valor_despesa;
    }

    public void setValor_despesa(double valor_despesa) {
        this.valor_despesa = valor_despesa;
    }

    public Gerencia getGerencia() {
        return gerencia;
    }

    public void setGerencia(Gerencia gerencia) {
        this.gerencia = gerencia;
    }

   
}
