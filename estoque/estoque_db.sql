CREATE DATABASE estoque_db;
USE estoque_db;

CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    quantidade INT NOT NULL DEFAULT 0
);

INSERT INTO produtos (nome, quantidade) VALUES
('Cachorro Quente', 5),
('Coca Cola', 8),
('Pão de Queijo', 12),
('Fanta Uva', 9),
('Batata Frita', 10),
('Compota de Abacate', 6);

select * from produtos;