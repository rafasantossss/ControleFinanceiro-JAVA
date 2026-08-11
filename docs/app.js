// .then é o ENTAO. oq acontece depois de algo, ou seja, vai fazer isso e entao vai fazer tal coisa

// mapa de emojis por categoria, cada categoria tem um emoji correspondente
const emojiCategoria = {
    ALIMENTACAO: '🍔',
    TRANSPORTE: '🚌',
    LAZER: '🎮',
    OUTROS: '📦',
    Salário:`💰`,
    Investimentos : `📈`,
    Presente :`🎁`,
    Reembolso :`💸`
}

// Função para gerar a saudação baseada no horário
function atualizarSaudacao() {
    const hora = new Date().getHours();
    let saudacao = 'Boa noite';
    if (hora >= 5 && hora < 12) saudacao = 'Bom dia';
    else if (hora >= 12 && hora < 18) saudacao = 'Boa tarde';

    const saudacaoEl = document.getElementById('saudacao');
    if (saudacaoEl) saudacaoEl.innerText = saudacao;
}

// troca a aba visivel na tela, esconde todas e mostra só a que foi clicada
function trocarAba(nome, btn) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active')) // remove active de todas as abas
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active')) // remove active de todos os botoes da nav
    document.getElementById('tab-' + nome).classList.add('active') // ativa a aba clicada

    // Sincroniza os botões (se clicar na sidebar, ativa o da bottom nav e vice-versa)
    document.querySelectorAll('.nav-btn').forEach(b => {
        if (b.getAttribute('onclick').includes(`'${nome}'`)) b.classList.add('active');
    });
}

// abre o modal de adicionar gasto (Alterado para classList para permitir animação CSS)
let tipoAtual = ' '

function abrirModal(tipo) {

    tipoAtual = tipo;

    const categoria = document.getElementById("categoria");

    if (tipo == "SAIDA") {

        categoria.innerHTML = `
            <option value="ALIMENTACAO">🍔 Alimentação</option>
            <option value="TRANSPORTE">🚌 Transporte</option>
            <option value="LAZER">🎮 Lazer</option>
            <option value="OUTROS">📦 Outros</option>
        `;

    } else {

        categoria.innerHTML = `
            <option value="Salário">💰 Salário</option>
            <option value="Investimentos">📈 Investimentos</option>
            <option value="Presente">🎁 Presente</option>
            <option value="Reembolso">💸 Reembolso</option>
            <option value="OUTROS">📦 Outros</option>
        `;

    }

    document.getElementById("modal").classList.add("active");
}

// fecha o modal de adicionar gasto (Alterado para classList para permitir animação CSS)
function fecharModal() {
    document.getElementById('modal').classList.remove('active');
}

// Ícones minimalistas para os botões de ação
const iconeEditar = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>`;
const iconeDeletar = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`;

function carregarGastos() {

    let total = 0

    fetch('https://controlefinanceiro-java.onrender.com/gastos')
        .then(function(resposta) { // cria variavel resposta e retorna com a resposta do /gastos
            return resposta.json()
        })
        .then(function(dados) { // dados é oq retorna no console do json
            const lista = document.getElementById('listaGastos') // lista = lista do html, gastos, desc e etc
            const totalValor = document.getElementById('totalGastos') // totalValor = aba de gastos no html
            const qntd = document.getElementById('qtdGastos') // qntd = quantidade no html
            lista.innerHTML = '' // impede duplicacao de informacoes
            if(dados.length == 0) { // se nao tiver nenhum dado inserido retorna isso
                lista.innerHTML = '<p class="vazio">Nenhum gasto cadastrado ainda.</p>'
                totalValor.textContent = 'R$ 0,00' // + 0 pra ele nao bugar e ficar com o valor do ultimo item, ja que se dados for 0 é pq nao tem dado, entao valor e 0
                qntd.textContent = 0 // definindo qntd igual a 0
            } else {
                dados.forEach(function (gasto) { // se tiver dado inserido retorna com os dados que foram colocados
                    if (gasto.tipo == "SAIDA") {
                        total = total - gasto.valor
                    } else {
                        total = total + gasto.valor
                    }// se o gasto for igual a saida ele vai diminuir do valor total, se nao vai ser somar o total
                    const emoji = emojiCategoria[gasto.categoria] || '📦' // pega o emoji da categoria, se nao tiver usa o de outros

                    // Formatações para o novo design
                    const catFormatada = gasto.categoria ? gasto.categoria.charAt(0) + gasto.categoria.slice(1).toLowerCase() : 'Outros';
                    const dataFormatada = gasto.data ? gasto.data.split('-').reverse().join('/') : '—';
                    const valorFormatado = parseFloat(gasto.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 });

                    // Se for SAIDA recebe "-", senão recebe "+"
                    let sinal = "";
                    if (gasto.tipo == "SAIDA") {
                        sinal = "-";
                    } else {
                        sinal = "+";
                    }

                    lista.textContent  += `
                        <div class="gasto-item" id="${gasto.id}">
                            <div class="gasto-emoji">${emoji}</div>
                            <div class="gasto-descricao">${gasto.descricao}</div>
                            
                            <div class="gasto-meta-mobile">${catFormatada} • ${dataFormatada}</div>
                            
                            <div class="desktop-only gasto-categoria"><span class="badge">${catFormatada}</span></div>
                            <div class="desktop-only gasto-data">${dataFormatada}</div>
                            <div class="gasto-valor">${sinal} R$ ${valorFormatado}</div> 
                            <div class="gasto-acoes">
                                <button class="btn-acao" onclick="editarGastos('${gasto.id}','${gasto.descricao}',${gasto.valor},'${gasto.categoria}','${gasto.data}','${gasto.tipo}')">${iconeEditar}</button>
                                <button class="btn-acao danger" onclick="deletarGastos('${gasto.id}')" title="Excluir">${iconeDeletar}</button>
                            </div>
                        </div>
                    `
                })
                qntd.textContent  = dados.length //muda no html a qntd com o numero de dados dentro da variavel dados
                totalValor.textContent  = 'R$ ' + total.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) // mudar escrita do html para o total somado ali em cima
            }
        })
}

function editarGastos(id, descricao, valor, categoria, data, tipo) {

    const linha = document.getElementById(id);

    // Aqui vamos guardar o HTML do select
    let selectCategoria = "";

    // Se for uma SAÍDA, mostra categorias de gastos
    if (tipo == "SAIDA") {

        selectCategoria = `
            <select id="edit-categoria">
                <option value="ALIMENTACAO" ${categoria == "ALIMENTACAO" ? "selected" : ""}>🍔 Alimentação</option>
                <option value="TRANSPORTE" ${categoria == "TRANSPORTE" ? "selected" : ""}>🚌 Transporte</option>
                <option value="LAZER" ${categoria == "LAZER" ? "selected" : ""}>🎮 Lazer</option>
                <option value="OUTROS" ${categoria == "OUTROS" ? "selected" : ""}>📦 Outros</option>
            </select>
        `;

    } else {

        // Se for ENTRADA, mostra categorias de entrada
        selectCategoria = `
            <select id="edit-categoria">
                <option value="Salário" ${categoria == "Salário" ? "selected" : ""}>💰 Salário</option>
                <option value="Investimentos" ${categoria == "Investimentos" ? "selected" : ""}>📈 Investimentos</option>
                <option value="Presente" ${categoria == "Presente" ? "selected" : ""}>🎁 Presente</option>
                <option value="Reembolso" ${categoria == "Reembolso" ? "selected" : ""}>💸 Reembolso</option>
                <option value="OUTROS" ${categoria == "OUTROS" ? "selected" : ""}>📦 Outros</option>
            </select>
        `;

    }

    linha.innerHTML = `
        <div class="edit-wrapper">

            <input id="edit-desc" type="text" value="${descricao}">

            <input id="edit-valor" type="number" step="0.01" value="${valor}">

            ${selectCategoria}

            <input id="edit-data" type="date" value="${data}">

            <button class="btn-primary" onclick="salvarEdicao('${id}')">
                Salvar
            </button>

        </div>
    `;
}

function salvarEdicao(id) {
    const novosDados = {
        descricao: document.getElementById('edit-desc').value,
        valor: document.getElementById('edit-valor').value,
        categoria: document.getElementById('edit-categoria').value,
        data: document.getElementById('edit-data').value,
    }

    fetch('https://controlefinanceiro-java.onrender.com/gastos/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'  // Avisando que é um pacote JSON
        },
        body: JSON.stringify(novosDados) // Pega objeto novosDados e converte em uma string de texto no formato JSON
    }).then(function() { // entao sempre que o fetch terminar ele executa funcao
        carregarGastos()
    })
}

function deletarGastos(id) {
    fetch('https://controlefinanceiro-java.onrender.com/gastos/' + id, { // aqui ele fala que o localhost /gastos vai adicionar o id do item, ou seja /gastos/1
        method: 'DELETE' // metodo que ele espera
    })
        .then(function() { // entao sempre que o fetch terminar ele executa funcao
            carregarGastos()
        })
}



window.onload = function() { // quando a pagina carrega ele chama funcao carregar gastos, pra evitar ficar tendo que dar f5
    atualizarSaudacao(); // chama a saudação dinâmica
    carregarGastos() // chamando a função

    const formulario = document.getElementById('gastoForm'); //puxa elemento com id de gastoForm e armazena na variavel

    formulario.addEventListener('submit', function (evento) {
        evento.preventDefault();
        //codigo de cima quando aperta em submit ele faz a função de previnir ação padrão de recarregar pagina

        const pacoteGasto = {
            // Pegando os valores dos campos do formulário
            descricao: document.getElementById('descricao').value,
            valor: document.getElementById('valor').value,
            data: document.getElementById('data').value,
            categoria: document.getElementById('categoria').value,
            tipo: tipoAtual //isso serve pra definir o tipo como tipo atual que vem la da funcao de abrir modal
        }; //cria objeto puxando valores de cada id do html // .value serve para extrair exatamente o texto que o usuário digitou
           //no final tudo é agrupado dentro da variavel pacoteGasto

        fetch('https://controlefinanceiro-java.onrender.com/gastos', { // fetch executa a chamada de rede para o backend.
            method: 'POST', // metodo que ele espera
            headers: {
                'Content-Type': 'application/json'  // Avisando que é um pacote JSON
            },
            body: JSON.stringify(pacoteGasto) // Pega objeto pacoteGasto e converte em uma string de texto no formato JSON
        })
            .then(function() { // entao sempre que o fetch terminar ele executa funcao
                fecharModal() // fecha o modal apos salvar
                formulario.reset() // limpa os campos do formulario
                carregarGastos()
            })
    });
}
