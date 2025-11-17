document.addEventListener("DOMContentLoaded", () => {


  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

  
  if (usuarioLogado) {
    
    const primeiroNome = usuarioLogado.nome.split(" ")[0];

    
    const spanNome = document.querySelector(".id");
    if (spanNome) {
      spanNome.textContent = primeiroNome;
    }
  } else {
    
    window.location.href = "login.html";
  }
});
