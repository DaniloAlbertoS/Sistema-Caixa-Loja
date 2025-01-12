package com.sistemacaixaloja.sistemacaixaloja.dto;



public class UsuarioLogadoDTO {
    private String tipoUsuario;
    private String nome;
    private int matricula;

    public UsuarioLogadoDTO(String tipoUsuario, String nome, int matricula) {
        this.tipoUsuario = tipoUsuario;
        this.nome = nome;
        this.matricula = matricula;
    }

    public String getTipoUsuario() {
        return tipoUsuario;
    }

    public void setTipoUsuario(String tipoUsuario) {
        this.tipoUsuario = tipoUsuario;
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
}

