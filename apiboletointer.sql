

CREATE TABLE `client` (
  `id_client` int NOT NULL,
  `name` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `telefone` varchar(20) NOT NULL,
  `doc` varchar(25) NOT NULL,
  `cep` varchar(20) NOT NULL,
  `numero` varchar(5) NOT NULL,
  `complemento` varchar(200) NOT NULL,
  `bairro` varchar(200) NOT NULL,
  `cidade` varchar(100) NOT NULL,
  `uf` varchar(2) NOT NULL,
  `endereco` varchar(200) NOT NULL,
  `ddd` varchar(3) NOT NULL,
  `valor` varchar(12) NOT NULL,
  `desconto` varchar(10) NOT NULL,
  `type_client` varchar(200) NOT NULL,
  `plano` int NOT NULL, -- controle interno para separar faturamento ou data de vencimento
  `numbercontrol` varchar(10) NOT NULL,
  `status_client` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


ALTER TABLE `client`
  ADD PRIMARY KEY (`id_client`);


ALTER TABLE `client`
  MODIFY `id_client` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

