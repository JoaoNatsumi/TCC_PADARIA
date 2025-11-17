function inicializarBanco() {
    if (!localStorage.getItem("usuarios")) {

        const usuarios = [

            {
                nome: "João Vitor Manso Natsumi",
                curso: "3º DB",
                funcionario: true,
                senha: "1234"
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

            {
                nome: "Daniel Moreira",
                curso: "3º DB",
                funcionario: false
            },
            {
                nome: "Diana Braite",
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



function validarLogin() {
    const nome = document.getElementById("nome").value.trim();
    const curso = document.getElementById("curso").value;
    const funcionarioCheck = document.getElementById("funcionario").checked;
    const senha = document.getElementById("senha").value.trim();

    const usuarios = JSON.parse(localStorage.getItem("usuarios"));

    
    const usuario = usuarios.find(
        u => u.nome.toLowerCase() === nome.toLowerCase() && u.curso === curso
    );

    
    if (!usuario) {
        alert("Usuário não encontrado no sistema!");
        return false;
    }

    
    const primeiroNome = usuario.nome.split(" ")[0];

    
    if (!usuario.funcionario && funcionarioCheck) {
        alert("Esse usuário não é funcionário!");
        return false;
    }

    
    if (usuario.funcionario) {
        if (!senha) {
            alert("Digite a senha do funcionário!");
            return false;
        }

        if (senha !== usuario.senha) {
            alert("Senha incorreta!");
            return false;
        }

        
        localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

        
        alert("Bem-vindo, " + primeiroNome + "!");

        window.location.href = "funcionario.html"; 
        return false;
    }

    
    localStorage.setItem("usuarioLogado", JSON.stringify(usuario));


    alert("Bem-vindo, " + primeiroNome + "!");

    window.location.href = "index.html"; 

    return false; 
}

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

function toggleSenha() {
    let campo = document.getElementById("senha");
    campo.type = campo.type === "password" ? "text" : "password";
}
