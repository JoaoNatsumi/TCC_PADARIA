const container_itens = document.querySelector(".cart-product");
let itens = JSON.parse(localStorage.getItem("info_produto")) || [];

// Função para formatar valores em reais
function formatarValor(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

// Função para calcular o total
function calcularTotal() {
  let total = 0;
  document.querySelectorAll(".item-valor").forEach(span => {
    const valor = parseFloat(
      span.textContent.replace("R$", "").replace(",", ".").trim()
    );
    if (!isNaN(valor)) total += valor;
  });

  // Atualiza o span de total
  const spanTotal = document.querySelector(".total span.total, .total > .total");
  if (spanTotal) {
    spanTotal.textContent = formatarValor(total);
  }

  return total; // ✅ Agora retorna o número
}

// Renderiza os produtos salvos
itens.forEach((item, index) => {
  const tr = document.createElement("tr");

  tr.innerHTML = `
    <td class="product-identification">
      <div class="item">
        <span class="item-nome">${item.nome}</span>
        <span class="item-valor">${item.valor}</span>
        <button type="button" class="remove-product-button" data-index="${index}">Remover</button>
      </div>
    </td>
  `;

  container_itens.appendChild(tr);
});

// Calcula o total inicial
calcularTotal();

// Adiciona eventos de remoção
document.querySelectorAll(".remove-product-button").forEach(button => {
  button.addEventListener("click", function (event) {
    const index = parseInt(event.target.getAttribute("data-index"));

    // Remove do array
    itens.splice(index, 1);

    // Atualiza o localStorage
    localStorage.setItem("info_produto", JSON.stringify(itens));

    // Remove o elemento da tela
    const tr = event.target.closest("tr");
    tr.remove();

    // Recalcula o total após remoção
    calcularTotal();
  });
});


// === GERAÇÃO DO QR CODE ===

// Seleciona a div do PIX
const pixDiv = document.querySelector('.payment-option img[alt="Logo do PIX"]')?.closest('.payment-option');

// Seleciona o container do QR
const qrcodeContainer = document.getElementById("qrcode-container");
const qrcodeDiv = document.getElementById("qrcode");
const fecharBtn = document.getElementById("fechar-qrcode");

// Função para gerar QR Code com o total
function gerarQRCodePix() {
  const totalSpan = document.querySelector(".total span.total, .total > .total");
  if (!totalSpan) return alert("Total não encontrado.");

  const valorTexto = totalSpan.textContent.replace("R$", "").replace(",", ".").trim();
  const valor = parseFloat(valorTexto);
  if (isNaN(valor) || valor <= 0) return alert("Valor inválido ou sacola vazia.");

  const chavePix = "chavepix@exemplo.com";
  const mensagem = `Pagamento via PIX\nChave: ${chavePix}\nValor: R$ ${valor.toFixed(2)}`;

  qrcodeDiv.innerHTML = "";
  new QRCode(qrcodeDiv, {
    text: mensagem,
    width: 200,
    height: 200,
  });

  qrcodeContainer.style.display = "flex";
}

// Evento de clique na div do PIX
if (pixDiv) {
  pixDiv.addEventListener("click", gerarQRCodePix);
}

// Botão para fechar o QR Code
fecharBtn.addEventListener("click", () => {
  qrcodeContainer.style.display = "none";
});


// === BOTÃO "FAZER PEDIDO" ===
const btnPedido = document.querySelector(".order-button");

if (btnPedido) {
  btnPedido.addEventListener("click", () => {
    const total = calcularTotal(); // ✅ agora retorna valor numérico

    if (total <= 0) {
      alert("❌ Sua sacola está vazia! Adicione itens antes de fazer o pedido.");
      return;
    }

    // === SALVAR PEDIDO ===

    // Pega itens atuais
    let itens_sacola = JSON.parse(localStorage.getItem("info_produto")) || [];

    // Monta lista de itens para o pedido
    const listaItens = itens_sacola.map(item => {
      return `${item.nome} - ${item.valor}`;
    });

    // Carrega pedidos já existentes
    let pedidosExistentes = JSON.parse(localStorage.getItem("pedidos_salvos")) || [];

    // Cria objeto do pedido
    const pedido = {
      itens: listaItens,
      total: total,
      pagamento: "PIX"
    };

    // Salva no localStorage
    pedidosExistentes.push(pedido);
    localStorage.setItem("pedidos_salvos", JSON.stringify(pedidosExistentes));

    alert("✅ Pedido enviado com sucesso!");

    // Limpa a sacola
    localStorage.removeItem("info_produto");

    // Vai para a tela de pedidos
    window.location.href = "pedidoscliente.html";

  });
}
