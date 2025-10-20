<?php
$host = "localhost";
$usuario = "root";   // coloque o usuário do seu MySQL
$senha = "";         // coloque a senha do seu MySQL
$banco = "estoque_db";

$conn = new mysqli($host, $usuario, $senha, $banco);

if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}
?>
