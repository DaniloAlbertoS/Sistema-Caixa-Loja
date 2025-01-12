package com.sistemacaixaloja.sistemacaixaloja.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {

    @GetMapping("/")
    public String index() {
        return "index"; // Página inicial
    }

    @GetMapping("/menu-gerencia")
    public String menuGerencia() {
        return "menu-gerencia"; // Página do menu da gerência
    }

    @GetMapping("/tela-financeiro")
    public String telaFinanceiro() {
        return "tela_financeiro"; // Página do financeiro
    }

    @GetMapping("/cadastro-relatorios")
    public String cadastroRelatorios() {
        return "cadastro_de_relatorios"; // Página de cadastro de relatórios
    }

    @GetMapping("/cadastro-financeiro")
    public String cadastroFinanceiro() {
        return "cadastro_financeiro"; // Página de cadastro financeiro
    }

    @GetMapping("/cadastro-gerencia")
    public String cadastroGerencia() {
        return "cadastro_gerencia"; // Página de cadastro de gerência
    }

    @GetMapping("/cadastro-lojas")
    public String cadastroLojas() {
        return "cadastro_lojas"; // Página de cadastro de lojas
    }

    @GetMapping("/editar-colaboradores")
    public String editarColaboradores() {
        return "editar_colaboradores"; // Página de edição de colaboradores
    }

    @GetMapping("/editar-lojas")
    public String editarLojas() {
        return "editar_lojas"; // Página de edição de lojas
    }

    @GetMapping("/listar-colaboradores")
    public String listarColaboradores() {
        return "listar_colaboradores"; // Página de listagem de colaboradores
    }

    @GetMapping("/listar-lojas")
    public String listarLojas() {
        return "listar_lojas"; // Página de listagem de lojas
    }

    @GetMapping("/menu-financeiro")
    public String menuFinanceiro() {
        return "tela_financeiro"; // Página do menu financeiro
    }

    @GetMapping("/saiba-mais")
    public String saibaMais() {
        return "saiba+"; // Página "Saiba Mais"
    }

    @GetMapping("/visualizar-relatorio")
    public String visualizarRelatorio() {
        return "tela_visualizar_relatorio"; // Página de visualização de relatórios
    }

    @GetMapping("/visualizar-relatorios-diarios")
    public String visualizarRelatoriosDiarios() {
        return "tela_visualizar_relatorios_diarios"; // Página de relatórios diários
    }

    @GetMapping("/cadastro-colaboradores")
    public String cadastroColaboradores() {
        return "tela_cadastro_colaboradores"; // Página de cadastro de colaboradores
    }
}
