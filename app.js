const formulario = document.getElementById('gastoForm'); //puxa elemento com id de gastoForm e armazena na variavel

formulario.addEventListener('submit', function(evento) {
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
        method: 'POST', // O método que o java está esperando
        headers: {
            'Content-Type': 'application/json' // Avisando que é um pacote JSON
        },
        body: JSON.stringify(pacoteGasto) // Pega objeto pacoteGasto e converte em uma string de texto no formato JSON
    });
});