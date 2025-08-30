let produto_infomacoes = {
    CachorroQuente: {
        nome: "<span class='spanC'>C</span><span class='spanA'>A</span>chorro Quente",
        imagem: "url(img/cq.png)",
        valor: "R$ 10",
        descricao: "Feito com muito carinho pelos alunos de Gastronomia, nosso tradicional cachorro-quente leva pão macio, salsicha, molho caseiro com tomate, cebola e temperos especiais. Pode ser acompanhado de batata palha, queijo ralado e outros adicionais deliciosos. Uma opção prática, saborosa e feita com cuidad o na cozinha da Camargo!"
    },
    CocaCola: {
        nome: "Coca-Cola",
        imagem: "url(img/coca-cola.jpg)",
        valor: "R$ 4,50",
        descricao: "Nada melhor do que acompanhar seu lanche com uma Coca-Cola bem gelada! Disponível nas versões lata e garrafa, é a escolha perfeita para refrescar e completar seu momento na Padaria Camargo. Servida na temperatura ideal, direto da nossa geladeira para você!"
    },

    PaodeQueijo: {
        nome: "Pão de Queijo",
        imagem: "url(img/paodegue.jpg)",
        valor: "R$ 5,00",
        descricao: "Tradicional, quentinho e irresistível! Nosso pão de queijo é feito com ingredientes selecionados, queijo de verdade e aquele toque caseiro que conquista a todos. Perfeito para acompanhar um café fresquinho ou tornar qualquer momento mais saboroso. Experimente e sinta o carinho da Padaria Camargo em cada mordida!"
    }
}

const produtoshtml = document.querySelectorAll(".div_produtos")



produtoshtml.forEach(produto => {
    produto.addEventListener("click", (event) => {
        let nome_produto = produto.children[1].innerText
        nome_produto = altera_nome(nome_produto)
        localStorage.setItem("nome_produto", produto_infomacoes[nome_produto].nome);
        localStorage.setItem("imagem", produto_infomacoes[nome_produto].imagem);
        localStorage.setItem("valor", produto_infomacoes[nome_produto].valor)
        localStorage.setItem("descricao", produto_infomacoes[nome_produto].descricao);
        console.log(localStorage.getItem("descricao"))

    })
});

function altera_nome(nome) {
    const textoSemEspacosEHiifens = nome.replace(/[\s\-]+/g, '');
    nome = textoSemEspacosEHiifens
    const semAcentos = nome.normalize("NFD").replace(/[^a-zA-Z0-9]/g, "");
    nome = semAcentos
    return nome;
}

const add_bag = document.querySelector(".add_bag");

// Recupera do localStorage, ou inicia lista vazia
let lista_itens = JSON.parse(localStorage.getItem("info_produto")) || [];

add_bag.addEventListener("click", () => {
  const container_produto = document.querySelector(".container_texto_produto");
  const nome_item = container_produto.children[0].innerText;
  const valor_item = container_produto.children[1].innerText;

  const item = {
    nome: nome_item,
    valor: valor_item
  };

  lista_itens.push(item);

  // Salva no localStorage
  localStorage.setItem("info_produto", JSON.stringify(lista_itens));

  console.log(lista_itens); // Apenas para teste no console (opcional)
});


