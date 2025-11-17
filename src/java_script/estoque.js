document.addEventListener("DOMContentLoaded", function() {

    
    const produtosIniciais = [
        { nome: "Cachorro Quente", qtd: 5 },
        { nome: "Coca Cola", qtd: 8 },
        { nome: "Pão de Queijo", qtd: 12 },
        { nome: "Fanta Uva", qtd: 9 },
        { nome: "Batata Frita", qtd: 10 },
        { nome: "Compota de Abacate", qtd: 6 }
    ];

    
    if (!localStorage.getItem("estoque")) {
        localStorage.setItem("estoque", JSON.stringify(produtosIniciais));
    }

    
    let estoque = JSON.parse(localStorage.getItem("estoque"));

    
    const produtosDOM = document.querySelectorAll(".estoque");

    produtosDOM.forEach(produtoDiv => {
        const nome = produtoDiv.querySelector("h3").innerText;
        const item = estoque.find(p => p.nome === nome);
        const spanQtd = produtoDiv.querySelector("span");

        
        if (item) spanQtd.innerText = item.qtd;

        
        const btnMenos = produtoDiv.querySelectorAll(".button")[0];
        const btnMais = produtoDiv.querySelectorAll(".button")[1];

        btnMais.addEventListener("click", () => {
            item.qtd++;
            spanQtd.innerText = item.qtd;
        });

        btnMenos.addEventListener("click", () => {
            if (item.qtd > 0) item.qtd--;
            spanQtd.innerText = item.qtd;
        });
    });

   
    const botaoSalvar = document.querySelector("#button_salvar button");
    botaoSalvar.addEventListener("click", () => {
        localStorage.setItem("estoque", JSON.stringify(estoque)); 
        alert("Alterações salvas com sucesso!");
        window.location.href = "pedidos.html"; 
    });

});
