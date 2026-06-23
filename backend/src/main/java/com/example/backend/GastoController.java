package com.example.backend;

import java.util.UUID;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class GastoController {

    private List<Gasto> gastos = new ArrayList<>(); //cria variavel privada chamada gastos que só recebe valores da class gasto

    @PostMapping("/gastos")
    public void salvarGasto(@RequestBody Gasto novoGasto) { //pega o arquivo json do navegador e manda ele preencher de acordo com a class gastos do gastos.java
        String id = UUID.randomUUID().toString(); //UUID.randomUUID() gera id, .toString() tranforma em texto e "String id =" transforma o id que fizemos na variavel id
        novoGasto.setId(id); // pega o id gerado e guarda dentro do objeto
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

    @DeleteMapping("/gastos/{id}") // define a rota DELETE, o {id} é um espaço reservado que vai receber o id do item a ser excluído
    public void deletar(@PathVariable String id) { // método que recebe da URL o valor no lugar de {id} e guarda na variável id
        gastos.removeIf(gasto -> gasto.getId().equals(id)); // pega o que veio escrito no lugar do {id} da URL e guarda na variável id
    }
}
