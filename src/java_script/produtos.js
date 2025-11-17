let produto = {
    nome: localStorage.getItem("nome_produto"),
    imagem: localStorage.getItem("imagem"),
    valor: localStorage.getItem("valor"),
    descricao: localStorage.getItem("descricao")
}

let nome = document.querySelector(".title")
    nome.innerHTML = produto.nome
let imagem = document.querySelector(".container_body_produto")
    imagem.style.backgroundImage = produto.imagem
let valor = document.querySelector(".valor")
    valor.innerText = produto.valor    
let descricao = document.querySelector(".texto")
    descricao.innerText = produto.descricao   

// var voltar = document.querySelector(".button_voltar")
//     voltar.addEventListener("click",() =>{
//         localStorage.clear()
//     })

const botaoAdicionar = document.querySelector(".add_bag");

botaoAdicionar.addEventListener("click", () => {
    // muda visual do botão
    botaoAdicionar.style.backgroundColor = "#ffffff";
    botaoAdicionar.style.color = "#451a0e";
    botaoAdicionar.style.border = "1px solid #451a0e";

    // alerta
    alert("✅ Item adicionado à sacola!");

    // volta para o estilo original após 800ms
    setTimeout(() => {
        botaoAdicionar.style.backgroundColor = "#451a0e";
        botaoAdicionar.style.color = "#c69c73";
        botaoAdicionar.style.border = "1px solid #451a0e";
    }, 800);
});
