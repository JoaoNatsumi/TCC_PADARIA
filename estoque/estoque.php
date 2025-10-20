<?php
include('conexao.php');

// Atualiza os valores se um botão for pressionado
if (isset($_POST['acao'])) {
    $id = intval($_POST['id']);
    if ($_POST['acao'] == 'incrementar') {
        $conn->query("UPDATE produtos SET quantidade = quantidade + 1 WHERE id = $id");
    } elseif ($_POST['acao'] == 'decrementar') {
        $conn->query("UPDATE produtos SET quantidade = GREATEST(quantidade - 1, 0) WHERE id = $id");
    }
}

$result = $conn->query("SELECT * FROM produtos");
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Estoque</title>
    <link rel="stylesheet" href="src/reset.css">
    <link rel="stylesheet" href="src/style.css">
</head>
<body id="teste_body">
    <div class="body_estoque">
        <a href="index.html"> <img src="img/botao_voltar_transparente.png" alt="icone voltar" class="voltar"> </a>
        <h1>Estoque</h1>
    </div>

    <div id="container_estoque">
        <?php while ($produto = $result->fetch_assoc()) { ?>
            <form method="POST" class="estoque">
                <input type="hidden" name="id" value="<?= $produto['id'] ?>">

                <button type="submit" name="acao" value="decrementar" class="button"> <p>-</p> </button>

                <div class="position_estoque">
                    <h3><?= htmlspecialchars($produto['nome']) ?></h3>
                    <p>Itens: <?= $produto['quantidade'] ?></p>
                </div>

                <div class="container_button">
                    <button type="submit" name="acao" value="incrementar" class="button"> <p>+</p> </button>
                </div>
            </form>
        <?php } ?>

        <div id="button_salvar">
            <button type="button" onclick="window.location.reload();">SALVAR</button>
        </div>
    </div>
</body>
</html>