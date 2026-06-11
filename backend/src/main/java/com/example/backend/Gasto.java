package com.example.backend;

import java.math.BigDecimal;
import java.time.LocalDate;

public class Gasto {

    private String descricao;
    private BigDecimal valor;
    private LocalDate data;
    private String categoria;

    public String getDescricao(){
        return descricao;
    }
    public void setDescricao(String descricao){
        this.descricao = descricao;
    }
    public BigDecimal getvalor(){
        return valor;
    }
    public void setValor(BigDecimal valor){
        this.valor = valor;
    }
    public LocalDate getdata(){
        return data;
    }
    public void setData(LocalDate data){
        this.data = data;
    }
    public String getcategoria(){
        return categoria;
    }
    public void setCategoria(String categoria){
        this.categoria = categoria;
    }
}
