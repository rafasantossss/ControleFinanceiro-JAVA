function carregarGastos() {


    fetch('http://localhost:8080/gastos')
        .then(function(resposta) {
            return resposta.json()
        })
        .then(function(dados) { // dados é oq retorna no console do json
            const lista = document.getElementById('listaGastos')
            lista.innerHTML = ''
            if(dados.length == 0) {
                lista.innerHTML = 'Nenhum gasto cadastrado ainda.'
            }else {
                dados.forEach(function (gasto) {
                    lista.innerHTML += '<p>' + gasto.descricao + ' -- R$ ' + gasto.valor + ' -- ' + gasto.categoria + ' -- ' + gasto.data + '</p>'// adiciona o HTML de cada gasto aqui

                })
            }
        })

}

window.onload = function() {
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

        fetch('http://localhost:8080/gastos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pacoteGasto)
        })
            .then(function() {
                carregarGastos()
            })
    });
}

