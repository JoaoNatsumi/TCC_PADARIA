const listaPedidos = document.getElementById("lista-pedidos");

function carregarPedidos() {
    const pedidos = JSON.parse(localStorage.getItem("pedidos_salvos")) || [];
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

    listaPedidos.innerHTML = "";

    if (!usuarioLogado) {
        listaPedidos.innerHTML = "<p>Erro: nenhum usuário logado.</p>";
        return;
    }

    const nomeUsuario = usuarioLogado.nome.toLowerCase();
    const ehFuncionario = usuarioLogado.funcionario;

    let pedidosFiltrados = [];

    if (ehFuncionario) {
        
        pedidosFiltrados = pedidos;
    } else {
        
        pedidosFiltrados = pedidos.filter(
            p => p.usuario?.toLowerCase() === nomeUsuario
        );
    }

    if (pedidosFiltrados.length === 0) {
        listaPedidos.innerHTML = `
            <p style="text-align:center; font-size:18px; color:#444;">
                Nenhum pedido encontrado.
            </p>
        `;
        return;
    }

    pedidosFiltrados.forEach((pedido, index) => {
        const div = document.createElement("div");
        div.classList.add("pedido-item");

        div.innerHTML = `
            <h3>${pedido.usuario} – ${pedido.curso}</h3>
            <p><strong>Itens:</strong> ${pedido.itens.join(", ")}</p>
            <p><strong>Total:</strong> R$ ${pedido.total.toFixed(2)}</p>
            <button class="btn-entregar" data-index="${index}">
                Marcar como entregue
            </button>
        `;

        listaPedidos.appendChild(div);
    });

    configurarBotoes();
}

function configurarBotoes() {
    const botoes = document.querySelectorAll(".btn-entregar");

    botoes.forEach(botao => {
        botao.addEventListener("click", () => {
            const index = botao.getAttribute("data-index");
            removerPedido(index);
        });
    });
}

function removerPedido(index) {
    let pedidos = JSON.parse(localStorage.getItem("pedidos_salvos")) || [];

    pedidos.splice(index, 1);

    localStorage.setItem("pedidos_salvos", JSON.stringify(pedidos));

    carregarPedidos();
}

carregarPedidos();
