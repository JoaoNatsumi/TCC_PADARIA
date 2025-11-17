const container_itens = document.querySelector(".cart-product");
let itens = JSON.parse(localStorage.getItem("info_produto")) || [];


function formatarValor(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}


function calcularTotal() {
  let total = 0;
  document.querySelectorAll(".item-valor").forEach(span => {
    const valor = parseFloat(span.textContent.replace("R$", "").replace(",", ".").trim());
    if (!isNaN(valor)) total += valor;
  });

  const spanTotal = document.querySelector(".total span.total, .total > .total");
  if (spanTotal) {
    spanTotal.textContent = formatarValor(total);
  }

  return total;
}


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

calcularTotal();


document.querySelectorAll(".remove-product-button").forEach(button => {
  button.addEventListener("click", function (event) {
    const index = parseInt(event.target.getAttribute("data-index"));

    itens.splice(index, 1);
    localStorage.setItem("info_produto", JSON.stringify(itens));

    const tr = event.target.closest("tr");
    tr.remove();

    calcularTotal();
  });
});


const pixDiv = document.querySelector('.payment-option img[alt="Logo do PIX"]')?.closest('.payment-option');
const qrcodeContainer = document.getElementById("qrcode-container");
const qrcodeDiv = document.getElementById("qrcode");
const fecharBtn = document.getElementById("fechar-qrcode");

function gerarQRCodePix() {
  const totalSpan = document.querySelector(".total span.total, .total > .total");
  if (!totalSpan) return alert("Total não encontrado.");

  const valorTexto = totalSpan.textContent.replace("R$", "").replace(",", ".").trim();
  const valor = parseFloat(valorTexto);
  if (isNaN(valor) || valor <= 0) return alert("Valor inválido.");

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

if (pixDiv) pixDiv.addEventListener("click", gerarQRCodePix);

fecharBtn.addEventListener("click", () => {
  qrcodeContainer.style.display = "none";
});


const btnPedido = document.querySelector(".order-button");

if (btnPedido) {
  btnPedido.addEventListener("click", () => {

    const total = calcularTotal();
    if (total <= 0) {
      alert("Sua sacola está vazia!");
      return;
    }

    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    let itens_sacola = JSON.parse(localStorage.getItem("info_produto")) || [];

    const listaItens = itens_sacola.map(item => `${item.nome} - ${item.valor}`);

    let pedidosExistentes = JSON.parse(localStorage.getItem("pedidos_salvos")) || [];

    const pedido = {
      usuario: usuarioLogado?.nome || "Desconhecido",
      curso: usuarioLogado?.curso || "",
      funcionario: usuarioLogado?.funcionario || false,
      itens: listaItens,
      total: total
    };

    pedidosExistentes.push(pedido);
    localStorage.setItem("pedidos_salvos", JSON.stringify(pedidosExistentes));

    alert("Pedido enviado com sucesso!");

    localStorage.removeItem("info_produto");

    window.location.href = "pedidoscliente.html";

  });
}
