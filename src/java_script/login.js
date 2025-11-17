// ===============================
// BANCO DE DADOS LOCAL (LocalStorage)
// ===============================

// Cadastro inicial somente na primeira vez
function inicializarBanco() {
    if (!localStorage.getItem("usuarios")) {

        const usuarios = [
            // Funcionários
            {
                nome: "João Vitor Manso Natsumi",
                curso: "3º DB",
                funcionario: true,
                senha: "1234" // senha exemplo
            },
            {
                nome: "Gustavo Gomes Silva",
                curso: "3º DB",
                funcionario: true,
                senha: "1234"
            },
            {
                nome: "Gabriela Holanda",
                curso: "3º DB",
                funcionario: true,
                senha: "1234"
            },

            // Clientes
            {
                nome: "Daniel Moreira",
                curso: "3º DB",
                funcionario: false
            },
            {
                nome: "Joao Braite",
                curso: "3º DB",
                funcionario: false
            },
            {
                nome: "João Natsumi",
                curso: "3º DB",
                funcionario: false
            }
        ];

        localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }
}
inicializarBanco();


// ===============================
// FUNÇÃO DE LOGIN
// ===============================
function validarLogin() {
    const nome = document.getElementById("nome").value.trim();
    const curso = document.getElementById("curso").value;
    const funcionarioCheck = document.getElementById("funcionario").checked;
    const senha = document.getElementById("senha").value.trim();

    const usuarios = JSON.parse(localStorage.getItem("usuarios"));

    // Procurar usuário pelo nome + curso
    const usuario = usuarios.find(
        u => u.nome.toLowerCase() === nome.toLowerCase() && u.curso === curso
    );

    // Caso usuário não exista
    if (!usuario) {
        alert("Usuário não encontrado no sistema!");
        return false;
    }

    // ✅ PEGAR PRIMEIRO NOME
    const primeiroNome = usuario.nome.split(" ")[0];

    // Caso seja cliente e tentou usar como funcionário
    if (!usuario.funcionario && funcionarioCheck) {
        alert("Esse usuário não é funcionário!");
        return false;
    }

    // Caso seja funcionário → precisa de senha
    if (usuario.funcionario) {
        if (!senha) {
            alert("Digite a senha do funcionário!");
            return false;
        }

        if (senha !== usuario.senha) {
            alert("Senha incorreta!");
            return false;
        }

        // LOGIN DO FUNCIONÁRIO
        localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

        // ✅ ALERT PERSONALIZADO COM PRIMEIRO NOME
        alert("Bem-vindo, " + primeiroNome + "!");

        window.location.href = "funcionario.html"; // redirecionamento para funcionário
        return false;
    }

    // LOGIN DO CLIENTE
    localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

    // ✅ ALERT PERSONALIZADO COM PRIMEIRO NOME
    alert("Bem-vindo, " + primeiroNome + "!");

    window.location.href = "index.html"; // redirecionamento para cliente

    return false; // evita reload do form
}



// ===============================
// MOSTRAR/ESCONDER CAMPO DE SENHA
// ===============================
function mostrarCampoSenha() {
    const check = document.getElementById("funcionario");
    const pw = document.getElementById("pw-wrapper");

    if (check.checked) {
        pw.style.display = "block";
        document.getElementById("senha").setAttribute("required", true);
    } else {
        pw.style.display = "none";
        document.getElementById("senha").removeAttribute("required");
    }
}


// ===============================
// MOSTRAR/OCULTAR SENHA
// ===============================
function toggleSenha() {
    let campo = document.getElementById("senha");
    campo.type = campo.type === "password" ? "text" : "password";
}
