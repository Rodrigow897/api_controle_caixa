
# Controle_caixa

Esta é uma API simples para gerenciar transações financeiras, permitindo criar, listar, buscar, resumir e deletar transações.


## Documentação da API

## status API
Verifica se a API está online.
HTTP
GET /
* Resposta de Sucesso (200 OK)
API de Gerenciamento Financeiro está online!
## Retorna todas as transações
HTTP
GET /transacoes
* Resposta de Sucesso (200 OK): Retorna um array com todas as transações cadastradas.
## Retorna o resumo financeiro
HTTP
GET /transacoes/resumo
* Resposta de Sucesso (200 OK): Retorna o total de entradas, saídas e o saldo atual.
## Retorna uma transação por ID
HTTP
GET /transacoes/${id}
Parâmetro	Tipo	Descrição
id	string	Obrigatório. O ID da transação que você quer.
* Resposta de Sucesso (200 OK)
* Resposta de Erro (404 Not Found)
## Adiciona uma nova transação
HTTP
POST /transacoes
Parâmetro do Corpo	Tipo	Descrição
descricao	string	Obrigatório. A descrição da transação.
valor	number	Obrigatório. O valor da transação.
tipo	string	Obrigatório. Pode ser 'entrada' ou 'saida'
## Deleta uma transação por ID
HTTP
DELETE /transacoes/${id}
Parâmetro	Tipo	Descrição
id	string	Obrigatório. O ID da transação a ser deletada.

* Resposta de Sucesso (200 OK)
JSON
{
  "mensagem": "Transação deletada com sucesso."
}

* Resposta de Erro (404 Not Found)
JSON
{
  "error": "Transação não encontrada."
}

