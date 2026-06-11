package com.example.backend;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class GastoController {

    private List<Gasto> gastos = new ArrayList<>();

    @PostMapping("/gastos")
    public void salvarGasto(@RequestBody Gasto novoGasto) {
        gastos.add(novoGasto);
        System.out.println("Chegou um gasto: " + novoGasto.getDescricao());
    }

    @GetMapping("/gastos")
    public List<Gasto> listar() {
        return gastos;
    }
}