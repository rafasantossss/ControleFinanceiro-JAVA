# 💸 Controle Financeiro

Sistema web de gerenciamento financeiro desenvolvido com Java, Spring Boot e JavaScript, permitindo o controle de receitas e despesas por meio de uma interface moderna, responsiva e intuitiva.

O projeto foi construído com foco em boas práticas de desenvolvimento, arquitetura REST, separação entre frontend e backend e persistência de dados utilizando JPA/Hibernate.

---

# 📌 Visão Geral

O Controle Financeiro é uma aplicação Full Stack que permite registrar movimentações financeiras, acompanhar o saldo consolidado e gerenciar transações de forma simples e eficiente.

A aplicação é composta por:

- Frontend hospedado no GitHub Pages;
- Backend desenvolvido em Spring Boot e hospedado na Railway;
- API REST para comunicação entre cliente e servidor;
- Banco de dados gerenciado através do Spring Data JPA.

---

# 🚀 Demonstração

**Aplicação:**  
https://rafasantossss.github.io/ControleFinanceiro-JAVA/

**API REST:**  
https://controlefinanceiro-java.onrender.com/

---

# ✨ Funcionalidades

- Cadastro de receitas e despesas
- Edição de movimentações financeiras
- Exclusão de registros
- Cálculo automático do saldo
- Contagem de transações
- Organização por categorias
- Registro por data
- Interface responsiva
- Atualização dinâmica dos dados sem recarregar a página
- Integração completa entre Frontend e Backend via Fetch API

---

# 🛠 Tecnologias Utilizadas

## Backend

- Java
- Spring Boot
- Spring Data JPA
- Hibernate
- Maven
- Jakarta Persistence

## Frontend

- HTML5
- CSS3
- JavaScript (ES6)
- Chart.js

## Deploy

- GitHub Pages
- Railway

---

# 🏗 Arquitetura

O projeto segue uma arquitetura baseada em API REST.

```text
Frontend (HTML + CSS + JavaScript)
            │
            │ HTTP (Fetch API)
            ▼
Backend (Spring Boot)
            │
            ▼
Spring Data JPA
            │
            ▼
Banco de Dados
```

A comunicação entre cliente e servidor é realizada utilizando requisições HTTP nos métodos REST (GET, POST, PUT e DELETE).

---

# 📂 Estrutura do Projeto

```text
ControleFinanceiro-JAVA
│
├── backend
│   ├── Entity
│   ├── Repository
│   ├── Controller
│   ├── Service
│   └── BackendApplication
│
├── frontend
│   ├── index.html
│   ├── style.css
│   ├── app.js
│   └── assets
│
└── README.md
```

---

# 🗄 Modelo de Dados

A entidade **Gasto** representa cada movimentação financeira cadastrada na aplicação.

| Campo | Tipo |
|--------|------|
| id | UUID |
| descricao | String |
| valor | BigDecimal |
| data | LocalDate |
| categoria | String |
| tipo | String |

## Tipos

- ENTRADA
- SAIDA

## Categorias

### Despesas

- Alimentação
- Transporte
- Lazer
- Outros

### Receitas

- Salário
- Investimentos
- Presente
- Reembolso
- Outros

---

# 🌐 Endpoints da API

| Método | Endpoint | Descrição |
|---------|----------|-----------|
| GET | /gastos | Lista todas as movimentações |
| POST | /gastos | Cadastra uma movimentação |
| PUT | /gastos/{id} | Atualiza uma movimentação |
| DELETE | /gastos/{id} | Remove uma movimentação |

---

# 💻 Interface

A interface foi desenvolvida priorizando simplicidade, responsividade e experiência do usuário.

Principais características:

- Layout moderno
- Glassmorphism
- Navegação otimizada para dispositivos móveis
- Dashboard financeiro
- Cards de resumo
- Modal para cadastro
- Atualização instantânea das informações

---

# ⚙ Como executar o projeto

## Clone o repositório

```bash
git clone https://github.com/rafasantossss/ControleFinanceiro-JAVA.git
```

## Backend

```bash
cd backend
mvn spring-boot:run
```

O servidor será iniciado em:

```
http://localhost:8080
```

## Frontend

Abra o arquivo `index.html` no navegador ou utilize a extensão **Live Server** do Visual Studio Code.

Também é possível acessar a versão publicada:

https://rafasantossss.github.io/ControleFinanceiro-JAVA/

---

# 📈 Melhorias Futuras

- Autenticação de usuários (JWT)
- Cadastro de múltiplas contas
- Dashboard com gráficos completos
- Filtros por período
- Busca por descrição
- Exportação para PDF
- Exportação para Excel
- Metas financeiras
- Orçamento mensal
- Relatórios personalizados

---

# 📚 Conceitos Aplicados

- Programação Orientada a Objetos (POO)
- API REST
- CRUD
- Arquitetura Cliente-Servidor
- Persistência de Dados
- Spring Data JPA
- Hibernate
- Manipulação do DOM
- JavaScript Assíncrono (Fetch API)
- Responsividade
- Organização em camadas

---

# 👨‍💻 Autor

**Rafael Santos**

GitHub: https://github.com/rafasantossss

---

# 📄 Licença

Este projeto foi desenvolvido para fins de estudo e demonstração de conhecimentos em desenvolvimento Full Stack utilizando Java, Spring Boot e JavaScript.
