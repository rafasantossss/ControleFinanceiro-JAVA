//define a ESTRUTURA da tabela

package com.example.backend;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity // cria tabela e diz pro banco de dados que e uma tabela com todas as variaveis da classe
public class Gasto {

    @Id //Diz qual campo é a chave primária ou seja, id
    @GeneratedValue(strategy = GenerationType.UUID) // Diz pro banco gerar o id automaticamente usando UUID
    private String id;
    private String descricao;
    private BigDecimal valor;
    private LocalDate data;
    private String categoria;
    private String tipo;


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
    public String getTipo(){
        return tipo;
    }
    public void setTipo(String tipo){
        this.tipo = tipo;
    }
}
