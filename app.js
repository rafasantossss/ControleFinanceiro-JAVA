const formulario = document.getElementById('gastoForm');

formulario.addEventListener('submit', function(evento) {
    evento.preventDefault(); // <-- Trava o recarregamento da tela!
    

    const pacoteGasto = {
        // Pegando os valores dos campos do formulário
        descricao: document.getElementById('descricao').value,
        valor: document.getElementById('valor').value,
        data: document.getElementById('data').value,
        categoria: document.getElementById('categoria').value
    };

    // Chamando o caminhão de entrega!
    fetch('http://localhost:8080/gastos', {
        method: 'POST', // O método que o Java está esperando
        headers: {
            'Content-Type': 'application/json' // Avisando que é um pacote JSON
        },
        body: JSON.stringify(pacoteGasto) // Colocando o nosso pacote
    });
});