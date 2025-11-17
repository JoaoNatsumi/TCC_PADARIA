// ===============================
//  TELA DE PEDIDOS - pedidos.js
// ===============================

// Elemento onde os pedidos serão listados
const listaPedidos = document.getElementById("lista-pedidos");

// Função para carregar pedidos salvos no localStorage
function carregarPedidos() {
    const pedidos = JSON.parse(localStorage.getItem("pedidos_salvos")) || [];
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

    // Limpa área de pedidos
    listaPedidos.innerHTML = "";

    // Nenhum pedido encontrado
    if (pedidos.length === 0) {
        listaPedidos.innerHTML = `
            <p style="text-align:center; font-size:18px; color:#444;">
                Você ainda não possui pedidos.
            </p>
        `;
        return;
    }

    // Se tiver usuário logado, cria o título personalizado
    let nomeCompleto = "Usuário Desconhecido";
    let curso = "";

    if (usuarioLogado) {
        nomeCompleto = usuarioLogado.nome;
        curso = usuarioLogado.curso;
    }

    // Pega primeiro e segundo nome, se existirem
    const partesNome = nomeCompleto.split(" ");
    const nomeExibicao =
        partesNome.length >= 2
            ? `${partesNome[0]} ${partesNome[1]}`
            : partesNome[0];

    // Renderiza cada pedido
    pedidos.forEach((pedido, index) => {
        const div = document.createElement("div");
        div.classList.add("pedido-item");

        div.innerHTML = `
            <h3>Pedido de ${nomeExibicao} – ${curso}</h3>
            <p><strong>Itens:</strong> ${pedido.itens.join(", ")}</p>
            <p><strong>Total:</strong> R$ ${pedido.total.toFixed(2)}</p>
            <button class="btn-entregar" data-index="${index}">
                Marcar como entregue
            </button>
        `;

        listaPedidos.appendChild(div);
    });

    // Configura os botões
    configurarBotoesMarcarEntregue();
}


// Configura cliques dos botões "Marcar como entregue"
function configurarBotoesMarcarEntregue() {
    const botoes = document.querySelectorAll(".btn-entregar");

    botoes.forEach(botao => {
        botao.addEventListener("click", () => {
            const index = botao.getAttribute("data-index");
            removerPedido(index);
        });
    });
}

// Função que remove o pedido do localStorage
function removerPedido(index) {
    let pedidos = JSON.parse(localStorage.getItem("pedidos_salvos")) || [];

    pedidos.splice(index, 1); // remove pelo índice

    localStorage.setItem("pedidos_salvos", JSON.stringify(pedidos));

    carregarPedidos(); // recarrega a tela
}

// Inicia carregando os pedidos ao abrir a página
carregarPedidos();
