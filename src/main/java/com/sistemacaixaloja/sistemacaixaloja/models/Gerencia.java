
package com.sistemacaixaloja.sistemacaixaloja.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="gerencia")
public class Gerencia{
   
   @Id
   @GeneratedValue(strategy =GenerationType.IDENTITY)
   private int idgerencia;
   
   @Column(nullable = false, length=45)
   private String nome;
   
   private int matricula;
   
   @Column(length=45)
   private String cargo;
   
   @Column(length=45)
   private String cpf;
   
   @ManyToOne
   @JoinColumn(name="gerencia_loja")
   private Loja loja;
   
   @Column(nullable = false)
   private boolean ativo=true;

    public Gerencia() {
    }

    public Gerencia(String nome, int matricula, String cargo, String cpf, boolean ativo) {
        this.nome = nome;
        this.matricula = matricula;
        this.cargo = cargo;
        this.cpf = cpf;
        this.ativo = ativo;
        
    }

    public int getIdgerencia() {
        return idgerencia;
    }

    public void setIdgerencia(int idgerencia) {
        this.idgerencia = idgerencia;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public int getMatricula() {
        return matricula;
    }

    public void setMatricula(int matricula) {
        this.matricula = matricula;
    }

    public String getCargo() {
        return cargo;
    }

    public void setCargo(String cargo) {
        this.cargo = cargo;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public Loja getLoja() {
        return loja;
    }

    public void setLoja(Loja loja) {
        this.loja = loja;
    }

    public boolean isAtivo() {
        return ativo;
    }

    public void setAtivo(boolean ativo) {
        this.ativo = ativo;
    }
   
   
}
