// ===============================
// MOSTRAR NOME DO USUÁRIO LOGADO
// ===============================

// Espera o carregamento da página
document.addEventListener("DOMContentLoaded", () => {

  // Recupera o usuário do localStorage
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

  // Verifica se há usuário logado
  if (usuarioLogado) {
    // Pega o primeiro nome
    const primeiroNome = usuarioLogado.nome.split(" ")[0];

    // Encontra o span e insere o nome
    const spanNome = document.querySelector(".id");
    if (spanNome) {
      spanNome.textContent = primeiroNome;
    }
  } else {
    // Se não houver login, redireciona para a tela de login
    window.location.href = "login.html";
  }
});
