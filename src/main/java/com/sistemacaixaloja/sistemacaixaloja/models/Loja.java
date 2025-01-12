
package com.sistemacaixaloja.sistemacaixaloja.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="loja")
public class Loja {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    
    private int idloja;
    
    @Column(name = "numero_loja", nullable = false) 
    private int numeroloja;
    
    @Column(nullable = false, length = 45)
    private String nome;
    
    @Column(length=45)
    private String endereco;
    
    @Column(length=45)
    private String telefone;
    
    @Column(length=45)
    private String email;
    
    @Column(columnDefinition = "text")
    private String horario_funcionamento;
    
    @Column(length=45)
    private String cnpj;
    
     @Column(length=45)
    private String cidade;

    public Loja() {
    }

    public Loja(int numeroloja, String nome, String endereco, String telefone, String email, String horario_funcionamento, String cnpj, String cidade) {
        this.numeroloja = numeroloja;
        this.nome = nome;
        this.endereco = endereco;
        this.telefone = telefone;
        this.email = email;
        this.horario_funcionamento = horario_funcionamento;
        this.cnpj = cnpj;
        this.cidade = cidade;
    }

    public int getIdLoja() {
        return idloja;
    }

    public void setIdLoja(int idLoja) {
        this.idloja = idLoja;
    }

    public int getNumeroloja() {
        return numeroloja;
    }

    public void setNumeroloja(int numeroloja) {
        this.numeroloja = numeroloja;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getHorario_funcionamento() {
        return horario_funcionamento;
    }

    public void setHorario_funcionamento(String horario_funcionamento) {
        this.horario_funcionamento = horario_funcionamento;
    }

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

   

   
    
}
