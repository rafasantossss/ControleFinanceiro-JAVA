// .then é o ENTAO. oq acontece depois de algo, ou seja, vai fazer isso e entao vai fazer tal coisa


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
                lista.innerHTML = 'Nenhum gasto cadastrado ainda.'
                totalValor.innerHTML = 'R$ ' + 0 // + 0 pra ele nao bugar e ficar com o valor do ultimo item, ja que se dados for 0 é pq nao tem dado, entao valor e 0
                qntd.innerHTML = 0
            }else {
                dados.forEach(function (gasto) { // se tiver dado inserido retorna com os dados que foram colocados
                    total = total + gasto.valor // total = total mais o valor inserido
                    console.log(gasto)
                    lista.innerHTML += `<p><button onclick="deletarGastos('${gasto.id}')">Apagar</button> ${gasto.descricao} -- R$ ${gasto.valor} -- ${gasto.categoria} -- ${gasto.data}</p>`
                })
                qntd.innerHTML = dados.length
                totalValor.innerHTML = 'R$ ' + total // mudar escrita do html para o total somado ali em cima
            }
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
                carregarGastos()
            })
    });
}

