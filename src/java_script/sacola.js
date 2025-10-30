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
    // Remove "R$", espaços e converte para número
    const valor = parseFloat(span.textContent.replace("R$", "").replace(",", ".").trim());
    if (!isNaN(valor)) total += valor;
  });

  // Atualiza o span de total
  const spanTotal = document.querySelector(".total span.total, .total > .total");
  if (spanTotal) {
    spanTotal.textContent = formatarValor(total);
  }
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
// --- CÓDIGO ANTERIOR (seu carrinho e soma dos itens) ---
// ... [seu código existente até o final do arquivo] ...

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

  // Obtém o valor numérico
  const valorTexto = totalSpan.textContent.replace("R$", "").replace(",", ".").trim();
  const valor = parseFloat(valorTexto);
  if (isNaN(valor)) return alert("Valor inválido.");

  // Simula um código PIX (aqui você pode colocar sua chave real, se quiser)
  const chavePix = "chavepix@exemplo.com";
  const mensagem = `Pagamento via PIX\nChave: ${chavePix}\nValor: R$ ${valor.toFixed(2)}`;
  
  // Limpa QR anterior e gera novo
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
    const total = calcularTotal();

    if (total <= 0) {
      alert("Sua sacola está vazia! Adicione itens antes de fazer o pedido.");
      return;
    }

    // Confirma o pedido
    alert("✅ Pedido realizado com sucesso!");

    // Limpa o carrinho na tela
    container_itens.innerHTML = "";

    // Limpa o localStorage
    localStorage.removeItem("info_produto");

    // Atualiza o total para R$ 0,00
    const spanTotal = document.querySelector(".total");
    if (spanTotal) {
      spanTotal.textContent = "R$ 0,00";
    }

  });
}