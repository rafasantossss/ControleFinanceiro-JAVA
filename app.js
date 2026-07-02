// .then é o ENTAO. oq acontece depois de algo, ou seja, vai fazer isso e entao vai fazer tal coisa

// mapa de emojis por categoria, cada categoria tem um emoji correspondente
const emojiCategoria = {
    ALIMENTACAO: '🍔',
    TRANSPORTE: '🚌',
    LAZER: '🎮',
    OUTROS: '📦'
}

// troca a aba visivel na tela, esconde todas e mostra só a que foi clicada
function trocarAba(nome, btn) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active')) // remove active de todas as abas
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active')) // remove active de todos os botoes da nav
    document.getElementById('tab-' + nome).classList.add('active') // ativa a aba clicada
    btn.classList.add('active') // ativa o botao clicado na nav
    if (nome === 'chart') desenharGrafico() // se for a aba de grafico, desenha o grafico
}

// abre o modal de adicionar gasto
function abrirModal() {
    document.getElementById('modal').style.display = 'flex'
}

// fecha o modal de adicionar gasto
function fecharModal() {
    document.getElementById('modal').style.display = 'none'
}

function carregarGastos() {

    let total = 0

    fetch('http://localhost:8080/gastos')
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
                    lista.innerHTML += `
                        <div class="gasto-item" id="${gasto.id}">
                            <div class="gasto-emoji">${emoji}</div>
                            <div class="gasto-info">
                                <div class="gasto-descricao">${gasto.descricao}</div>
                                <div class="gasto-meta">${gasto.categoria || '—'} · ${gasto.data || '—'}</div>
                            </div>
                            <span class="gasto-valor">-R$ ${gasto.valor}</span>
                            <div class="gasto-acoes">
                                <button class="btn-acao" onclick="editarGastos('${gasto.id}', '${gasto.descricao}', ${gasto.valor}, '${gasto.categoria}', '${gasto.data}')">✏️</button>
                                <button class="btn-acao danger" onclick="deletarGastos('${gasto.id}')">🗑️</button>
                            </div>
                        </div>
                    `
                })
                qntd.innerHTML = dados.length //muda no html a qntd com o numero de dados dentro da variavel dados
                totalValor.innerHTML = 'R$ ' + total.toFixed(2) // mudar escrita do html para o total somado ali em cima, toFixed(2) formata com 2 casas decimais
            }
        })
}

function editarGastos(id, descricao, valor, categoria, data) {
    const linha = document.getElementById(id)
    linha.className = 'edit-row' // troca a classe do elemento pra estilizar como linha de edicao
    linha.innerHTML = `<input id="edit-desc" type="text" value="${descricao}"><input id="edit-valor" type="number" value="${valor}"><select id="edit-categoria" ><option value="ALIMENTACAO" ${categoria === 'ALIMENTACAO' ? 'selected' : ''}>🍔 Alimentação</option> <option value="TRANSPORTE" ${categoria === 'TRANSPORTE' ? 'selected' : ''}>🚌 Transporte</option> <option value="LAZER" ${categoria === 'LAZER' ? 'selected' : ''}>🎮 Lazer</option> <option value="OUTROS" ${categoria === 'OUTROS' ? 'selected' : ''}>📦 Outros</option></select><input id="edit-data" type="date" value="${data}"><button class="btn-salvar-edit" onclick="salvarEdicao('${id}')">Salvar</button>`
}

function salvarEdicao(id) {
    const novosDados = {
        descricao: document.getElementById('edit-desc').value,
        valor: document.getElementById('edit-valor').value,
        categoria: document.getElementById('edit-categoria').value,
        data: document.getElementById('edit-data').value,
    }

    fetch('http://localhost:8080/gastos/' + id, {
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
    fetch('http://localhost:8080/gastos/' + id, { // aqui ele fala que o localhost /gastos vai adicionar o id do item, ou seja /gastos/1
        method: 'DELETE' // metodo que ele espera
    })
        .then(function() { // entao sempre que o fetch terminar ele executa funcao
            carregarGastos()
        })
}

// desenha o grafico de pizza com os gastos agrupados por categoria
function desenharGrafico() {
    fetch('http://localhost:8080/gastos')
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
            // Estilo minimalista/futurista: Paleta Monocromática e Tech Blue
            const cores = ['#2e8eff', '#00d4ff', '#1a365d', '#4a90e2', '#3182ce']

            if (window._grafico) window._grafico.destroy() // destroi o grafico anterior pra nao duplicar

            // cria o grafico usando a biblioteca Chart.js
            window._grafico = new Chart(canvas, {
                type: 'doughnut',
                data: {
                    labels: labels,
                    datasets: [{
                        data: valores,
                        backgroundColor: cores.slice(0, labels.length),
                        borderWidth: 0,
                    }]
                },
                options: {
                    plugins: {
                        legend: {
                            labels: { color: '#ffffff', font: { size: 12, family: 'Inter' } }
                        }
                    },
                    cutout: '80%' // Design minimalista: anel mais fino
                }
            })
        })
}

window.onload = function() { // quando a pagina carrega ele chama funcao carregar gastos, pra evitar ficar tendo que dar f5
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
            categoria: document.getElementById('categoria').value
        }; //cria objeto puxando valores de cada id do html // .value serve para extrair exatamente o texto que o usuário digitou
           //no final tudo é agrupado dentro da variavel pacoteGasto

        fetch('http://localhost:8080/gastos', { // fetch executa a chamada de rede para o backend.
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