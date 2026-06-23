package com.example.backend;

import java.math.BigDecimal;
import java.time.LocalDate;

public class Gasto {

    private String id;
    private String descricao;
    private BigDecimal valor;
    private LocalDate data;
    private String categoria;

    public String getId(){
        return id;
    }
    public void setId(String id){
        this.id = id;
    }
    public String getDescricao(){
        return descricao;
    }
    public void setDescricao(String descricao){
        this.descricao = descricao;
    }
    public BigDecimal getValor(){
        return valor;
    }
    public void setValor(BigDecimal valor){
        this.valor = valor;
    }
    public LocalDate getData(){
        return data;
    }
    public void setData(LocalDate data){
        this.data = data;
    }
    public String getCategoria(){
        return categoria;
    }
    public void setCategoria(String categoria){
        this.categoria = categoria;
    }
}
