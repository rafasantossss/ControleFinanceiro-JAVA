// .then é o ENTAO. oq acontece depois de algo, ou seja, vai fazer isso e entao vai fazer tal coisa

// mapa de emojis por categoria, cada categoria tem um emoji correspondente
const emojiCategoria = {
    ALIMENTACAO: '🍔',
    TRANSPORTE: '🚌',
    LAZER: '🎮',
    OUTROS: '📦'
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

    if (nome === 'chart') desenharGrafico() // se for a aba de grafico, desenha o grafico
}

// abre o modal de adicionar gasto (Alterado para classList para permitir animação CSS)
let tipoAtual = ' '

function abrirModal(tipo) { //ele devolve para a funcao que o tipo = ENTRADA, depois fala que o tipoAtual é igual a tipo

    tipoAtual = tipo
    document.getElementById('modal')  // pega o elemento com id="modal"
        .classList                     // acessa a lista de classes CSS dele
        .add('active');                 // adiciona a classe "active" que quando ta add ativa ele aparece
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

    fetch('https://controlefinanceiro-java-production.up.railway.app/gastos')
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
                totalValor.innerHTML = 'R$ 0,00' // + 0 pra ele nao bugar e ficar com o valor do ultimo item, ja que se dados for 0 é pq nao tem dado, entao valor e 0
                qntd.innerHTML = 0 // definindo qntd igual a 0
            } else {
                dados.forEach(function (gasto) { // se tiver dado inserido retorna com os dados que foram colocados
                    total = total + gasto.valor // total = total mais o valor inserido
                    const emoji = emojiCategoria[gasto.categoria] || '📦' // pega o emoji da categoria, se nao tiver usa o de outros

                    // Formatações para o novo design
                    const catFormatada = gasto.categoria ? gasto.categoria.charAt(0) + gasto.categoria.slice(1).toLowerCase() : 'Outros';
                    const dataFormatada = gasto.data ? gasto.data.split('-').reverse().join('/') : '—';
                    const valorFormatado = parseFloat(gasto.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 });

                    lista.innerHTML += `
                        <div class="gasto-item" id="${gasto.id}">
                            <div class="gasto-emoji">${emoji}</div>
                            <div class="gasto-descricao">${gasto.descricao}</div>
                            
                            <div class="gasto-meta-mobile">${catFormatada} • ${dataFormatada}</div>
                            
                            <div class="desktop-only gasto-categoria"><span class="badge">${catFormatada}</span></div>
                            <div class="desktop-only gasto-data">${dataFormatada}</div>
                            
                            <div class="gasto-valor">- R$ ${valorFormatado}</div>
                            <div class="gasto-acoes">
                                <button class="btn-acao" onclick="editarGastos('${gasto.id}', '${gasto.descricao}', ${gasto.valor}, '${gasto.categoria}', '${gasto.data}')" title="Editar">${iconeEditar}</button>
                                <button class="btn-acao danger" onclick="deletarGastos('${gasto.id}')" title="Excluir">${iconeDeletar}</button>
                            </div>
                        </div>
                    `
                })
                qntd.innerHTML = dados.length //muda no html a qntd com o numero de dados dentro da variavel dados
                totalValor.innerHTML = 'R$ ' + total.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) // mudar escrita do html para o total somado ali em cima
            }
        })
}

function editarGastos(id, descricao, valor, categoria, data) {
    const linha = document.getElementById(id)
    // Alterado para envolver em edit-wrapper para manter o alinhamento no redesign
    linha.innerHTML = `
        <div class="edit-wrapper">
            <input id="edit-desc" type="text" value="${descricao}">
            <input id="edit-valor" type="number" step="0.01" value="${valor}">
            <select id="edit-categoria">
                <option value="ALIMENTACAO" ${categoria === 'ALIMENTACAO' ? 'selected' : ''}>🍔 Alimentação</option> 
                <option value="TRANSPORTE" ${categoria === 'TRANSPORTE' ? 'selected' : ''}>🚌 Transporte</option> 
                <option value="LAZER" ${categoria === 'LAZER' ? 'selected' : ''}>🎮 Lazer</option> 
                <option value="OUTROS" ${categoria === 'OUTROS' ? 'selected' : ''}>📦 Outros</option>
            </select>
            <input id="edit-data" type="date" value="${data}">
            <button class="btn-primary" style="padding: 10px 20px" onclick="salvarEdicao('${id}')">Salvar</button>
        </div>
    `
}

function salvarEdicao(id) {
    const novosDados = {
        descricao: document.getElementById('edit-desc').value,
        valor: document.getElementById('edit-valor').value,
        categoria: document.getElementById('edit-categoria').value,
        data: document.getElementById('edit-data').value,
    }

    fetch('https://controlefinanceiro-java-production.up.railway.app/gastos/' + id, {
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
    fetch('https://controlefinanceiro-java-production.up.railway.app/gastos/' + id, { // aqui ele fala que o localhost /gastos vai adicionar o id do item, ou seja /gastos/1
        method: 'DELETE' // metodo que ele espera
    })
        .then(function() { // entao sempre que o fetch terminar ele executa funcao
            carregarGastos()
        })
}

// desenha o grafico de pizza com os gastos agrupados por categoria
function desenharGrafico() {
    fetch('https://controlefinanceiro-java-production.up.railway.app/gastos')
        .then(function(r) { return r.json() })
        .then(function(dados) {
            const vazio = document.getElementById('graficoVazio')
            const canvas = document.getElementById('graficoGastos')

            if (dados.length === 0) { // se nao tiver dados esconde o canvas e mostra mensagem
                canvas.style.display = 'none'
                vazio.style.display = 'block'
                return
            }

            canvas.style.display = 'block'
            vazio.style.display = 'none'

            const totais = {} // objeto que vai guardar o total de cada categoria
            dados.forEach(function(g) {
                const cat = g.categoria || 'OUTROS'
                totais[cat] = (totais[cat] || 0) + g.valor // soma o valor de cada categoria
            })

            const labels = Object.keys(totais) // nomes das categorias
            const valores = Object.values(totais) // valores de cada categoria
            // Estilo minimalista premium: Paleta de tons de cinza e branco
            const cores = ['#FFFFFF', '#D4D4D8', '#A1A1AA', '#71717A', '#3F3F46']

            if (window._grafico) window._grafico.destroy() // destroi o grafico anterior pra nao duplicar

            // cria o grafico usando a biblioteca Chart.js
            window._grafico = new Chart(canvas, {
                type: 'doughnut',
                data: {
                    labels: labels.map(l => l.charAt(0) + l.slice(1).toLowerCase()),
                    datasets: [{
                        data: valores,
                        backgroundColor: cores.slice(0, labels.length),
                        borderWidth: 4,
                        borderColor: '#09090B', // Separação elegante com a cor do fundo
                        hoverOffset: 8
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '82%', // Design minimalista: anel mais fino
                    plugins: {
                        legend: {
                            position: 'right',
                            labels: { color: '#A1A1AA', font: { size: 14, family: 'Inter' }, usePointStyle: true, padding: 20 }
                        },
                        tooltip: {
                            backgroundColor: '#18181B',
                            titleFont: { family: 'Inter' },
                            padding: 12,
                            cornerRadius: 12,
                            displayColors: false
                        }
                    },
                    animation: { duration: 1000, easing: 'easeOutQuart' }
                }
            })
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
        console.log(pacoteGasto)

        fetch('https://controlefinanceiro-java-production.up.railway.app/gastos', { // fetch executa a chamada de rede para o backend.
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