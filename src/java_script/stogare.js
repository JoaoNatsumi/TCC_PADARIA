let produto_infomacoes = {
    CachorroQuente: {
        nome: "<span class='spanC'>C</span><span class='spanA'>A</span>chorro Quente",
        imagem: "url(img/cq.png)",
        valor: "R$ 10,00",
        descricao: "Feito com muito carinho pelos alunos de Gastronomia, nosso tradicional cachorro-quente leva pão macio, salsicha, molho caseiro com tomate, cebola e temperos especiais. Pode ser acompanhado de batata palha, queijo ralado e outros adicionais deliciosos. Uma opção prática, saborosa e feita com cuidad o na cozinha da Camargo!"
    },
    CocaCola: {
        nome: "Coca-Cola (350ml)",
        imagem: "url(img/coca-cola.jpg)",
        valor: "R$ 4,50",
        descricao: "Nada melhor do que acompanhar seu lanche com uma Coca-Cola bem gelada! Disponível nas versões lata e garrafa, é a escolha perfeita para refrescar e completar seu momento na Padaria Camargo. Servida na temperatura ideal, direto da nossa geladeira para você!"
    },

    PaodeQueijo: {
        nome: "Pão de Queijo",
        imagem: "url(img/paodegue.jpg)",
        valor: "R$ 5,00",
        descricao: "Tradicional, quentinho e irresistível! Nosso pão de queijo é feito com ingredientes selecionados, queijo de verdade e aquele toque caseiro que conquista a todos. Perfeito para acompanhar um café fresquinho ou tornar qualquer momento mais saboroso. Experimente e sinta o carinho da Padaria Camargo em cada mordida!"
    }, 
    BatataFrita: {
        nome: "Batata Frita",
        imagem: "url(img/batata1.jpg)",
        valor: "R$ 10,00",
        descricao: "A batata frita da Padaria Camargo é daquelas que conquistam no primeiro garfo. Crocante por fora e macia por dentro, chega sempre quentinha, dourada no ponto certo e com aquele cheirinho irresistível de fritura na hora. O sal é na medida, realçando o sabor sem exageros. Uma verdadeira tentação de padaria!"
    },
    MiniPizza: {
        nome: "Mini Pizza",
        imagem: "url(img/minipizza.jpg)",
        valor: "R$ 5,00",
        descricao: "A mini pizza da Padaria Camargo é uma explosão de sabor em cada mordida. Com massa macia e levemente crocante nas bordas, é coberta por molho de tomate artesanal, queijo derretido, azeitonas, pedacinhos de presunto e pimentão fresco. Perfeita para um lanche prático e delicioso, feita com aquele toque caseiro da padaria." 
    }, 
    Hamburgao: {
        nome: "Hamburgão",
        imagem: "url(img/hamburgao.jpg)",
        valor: "R$ 9,00",
        descricao: "O hamburgao da Padaria Camargo é um clássico irresistível: massa macia e dourada, coberta com gergelim e recheada com hambúrguer suculento, queijo derretido, presunto e um toque de molho especial. Assado até ficar com uma crosta levemente crocante, ele combina sabor e textura em cada mordida — perfeito para um lanche saboroso e artesanal." 
    }, 
    
    Salgadinho: {
        nome: "Salgadinho",
        imagem: "url(img/salgado.jpg)",
        valor: "R$ 2,00",
        descricao: "Os salgadinhos da Padaria Camargo são irresistíveis: massa leve e douradinha, com recheio generoso e temperado na medida certa. Crocantes por fora e macios por dentro, são ideais para acompanhar um café, um refrigerante ou até uma boa conversa. Tradicionais, saborosos e sempre fresquinhos!" 
    }, 
    Refrigerante: {
        nome: "Refrigerante",
        imagem: "url(img/fanta.jpg)",
        valor: "R$ 4,50",
        descricao: "Opções: Guaraná Antarctica (350ml); Coca-Cola (350ml); Pepsi (350 ml); Sprite(350ml)." 
    }, 
    Suco: {
        nome: "Suco",
        imagem: "url(img/suco.jpg)",
        valor: "R$ 7,50",
        descricao: "Opções: Suco Natural One (300ml); Manguary (350ml); Ades (300ml); Del Valle (290ml)." 
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


