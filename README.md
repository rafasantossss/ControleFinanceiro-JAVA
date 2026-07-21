# 💸 Controle Financeiro

Sistema web de gerenciamento financeiro desenvolvido com Java, Spring Boot e JavaScript puro, permitindo o controle de receitas e despesas por meio de uma interface moderna, responsiva e intuitiva.

Projeto desenvolvido como aprendizado prático de desenvolvimento Full Stack, com auxílio de IA (Claude - Anthropic) como professor e revisor técnico ao longo de todo o processo.

---

## 🌐 Acesso

**Aplicação:** https://rafasantossss.github.io/ControleFinanceiro-JAVA/

**API REST:**
- https://controlefinanceiro-java.onrender.com/
- https://controlefinanceiro-java.onrender.com/gastos

---

## ✨ Funcionalidades

- Cadastro de receitas e despesas separados
- Edição de movimentações financeiras
- Exclusão de registros
- Cálculo automático do saldo (entradas - saídas)
- Contagem de transações
- Organização por categorias (gastos e receitas)
- Registro por data
- Saudação dinâmica baseada no horário
- Interface responsiva (mobile e desktop)
- Atualização dinâmica sem recarregar a página
- Integração completa entre Frontend e Backend via Fetch API

---

## 🛠 Tecnologias

**Backend**
- Java 21
- Spring Boot 4.0.6
- Spring Data JPA
- Hibernate
- Maven
- Jakarta Persistence

**Frontend**
- HTML5
- CSS3
- JavaScript (ES6+)
- Chart.js

**Banco de Dados**
- PostgreSQL (Neon)

**Deploy**
- GitHub Pages (Frontend)
- Render (Backend)
- UptimeRobot (Monitoramento e manutenção da disponibilidade da API)

---

## 🏗 Arquitetura

```
Frontend (HTML + CSS + JavaScript)
            │
            │ HTTP (Fetch API)
            ▼
Backend (Spring Boot — Render)
            │
            ▼
Spring Data JPA / Hibernate
            │
            ▼
PostgreSQL (Neon)
```

---

## 📂 Estrutura do Projeto

```
ControleFinanceiro-JAVA
│
├── backend
│   ├── src/main/java/com/example/backend
│   │   ├── Gasto.java           (Entidade JPA)
│   │   ├── GastoRepository.java (Repositório)
│   │   ├── GastoController.java (Controller REST)
│   │   └── BackendApplication.java
│   ├── src/main/resources
│   │   └── application.properties
│   └── pom.xml
│
├── frontend
│   ├── index.html
│   ├── style.css
│   ├── app.js
│   └── apple-touch-icon.png
│
└── README.md
```

---

## 🗄 Modelo de Dados

| Campo      | Tipo       |
|------------|------------|
| id         | UUID       |
| descricao  | String     |
| valor      | BigDecimal |
| data       | LocalDate  |
| categoria  | String     |
| tipo       | String     |

**Tipos**
- `ENTRADA` — receitas
- `SAIDA` — despesas

**Categorias de Saída**
- Alimentação, Transporte, Lazer, Outros

**Categorias de Entrada**
- Salário, Investimentos, Presente, Reembolso, Outros

---

## 🌐 Endpoints da API

| Método | Endpoint       | Descrição                    |
|--------|----------------|------------------------------|
| GET    | /gastos        | Lista todas as movimentações |
| POST   | /gastos        | Cadastra uma movimentação    |
| PUT    | /gastos/{id}   | Atualiza uma movimentação    |
| DELETE | /gastos/{id}   | Remove uma movimentação      |

---

## ⚙ Como executar localmente

**Clone o repositório**
```bash
git clone https://github.com/rafasantossss/ControleFinanceiro-JAVA.git
```

**Backend**
```bash
cd backend
mvn spring-boot:run
```
Servidor iniciado em: `http://localhost:8080`

**Frontend**

Abra o `frontend/index.html` no navegador ou use a extensão Live Server do VS Code.

---

## 📈 Melhorias Futuras

- Autenticação de usuários (JWT)
- Filtros por período e categoria
- Busca por descrição
- Exportação para PDF e Excel
- Metas financeiras mensais
- Gráficos avançados no dashboard
- Cadastro de múltiplas contas

---

## 📚 Conceitos Aplicados

- Programação Orientada a Objetos (POO)
- API REST e arquitetura Cliente-Servidor
- CRUD completo
- Persistência com Spring Data JPA e Hibernate
- UUID para identificação única
- Variáveis de ambiente para segurança
- Manipulação do DOM
- JavaScript assíncrono (Promises, Fetch API)
- Deploy separado de frontend e backend
- Responsividade com CSS Grid e Media Queries

---

## 🤖 Desenvolvimento com IA

Este projeto foi desenvolvido com auxílio do **Claude (Anthropic)** como professor e revisor técnico. A IA foi utilizada para:

- Explicar conceitos de Java, Spring Boot e JavaScript
- Revisar código e identificar erros
- Sugerir boas práticas de desenvolvimento
- Ensinar arquitetura REST e integração entre camadas
- Guiar o processo de deploy e configuração de banco de dados

O desenvolvimento seguiu uma metodologia de aprendizado ativo — os conceitos foram explicados antes de cada implementação, e o código foi escrito pelo próprio desenvolvedor.

---

## 👨‍💻 Autor

**Rafael Santos**

GitHub: https://github.com/rafasantossss

---

## 📄 Licença

Projeto desenvolvido para fins de estudo e demonstração de conhecimentos em desenvolvimento Full Stack com Java, Spring Boot e JavaScript.
