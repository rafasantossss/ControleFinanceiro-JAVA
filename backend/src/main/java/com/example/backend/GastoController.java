package com.example.backend;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class GastoController {

    private List<Gasto> gastos = new ArrayList<>(); //cria variavel privada chamada gastos que só recebe valores da class gasto

    @PostMapping("/gastos")
    public void salvarGasto(@RequestBody Gasto novoGasto) { //pega o arquivo json do navegador e manda ele preencher de acordo com a class gastos do gastos.java
        gastos.add(novoGasto); //adiciona o novo gasto dentro da array
        System.out.println("Chegou um gasto: " + novoGasto.getDescricao() +
                " | Valor: " + novoGasto.getValor() +
                " | Data: " + novoGasto.getData() +
                " | Categoria: " + novoGasto.getCategoria()); // avisa no terminal o gasto que chegou para teste
    }

    @GetMapping("/gastos")
    public List<Gasto> listar() {
        return gastos;
    } //retorna arraylist com o valor pedido
}