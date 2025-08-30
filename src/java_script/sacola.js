const container_itens = document.querySelector(".cart-product");
let itens = JSON.parse(localStorage.getItem("info_produto")) || [];

console.log(itens);

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

        // Opcional: recarregar a página para atualizar os índices
        // location.reload();
    });
});