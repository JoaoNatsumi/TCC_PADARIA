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