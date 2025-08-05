const pool = require('../config/db');

const addTransacao = async (req, res) => {
    const {descricao, valor, tipo} = req.body;

    try{
        const transacao = await pool.query(
            'INSERT INTO tb_transacoes (descricao, valor, tipo) VALUES ($1, $2, $3) RETURNING *',
            [descricao, valor, tipo]
        );
        res.status(200).json(transacao.rows[0])
    } catch (err) {
        console.error('Error ao criar transação', err)
        res.status(500).json({error: 'Erro ao criar transação'})
    }
};

const getTransacao =  async (_, res) => {
        try{
        const transacao = await pool.query('SELECT * FROM tb_transacoes');
        res.status(200).json(transacao.rows);
    } catch (err) {
        console.error('Erro ao buscar transações', err);
        res.status(500).json({error: 'Erro ao buscar transações'});
    }
};

const getResumoFinanceiro = async (_, res) => {
    try{
       const entradasQuery = await pool.query(
            "SELECT SUM(valor) AS total_entradas FROM tb_transacoes WHERE tipo = 'entrada'"
        );

        const saidasQuery = await pool.query(
            "SELECT SUM(valor) AS total_saidas FROM tb_transacoes WHERE tipo = 'saida'"
        );

        const total_entradas = parseFloat(entradasQuery.rows[0].total_entradas);
        const total_saidas = parseFloat(saidasQuery.rows[0].total_saidas);
        const saldo = total_entradas - total_saidas;

        res.status(200).json({total_entradas, total_saidas, saldo});
    } catch (err) {
        console.error('Erro ao buscar resumo financeiro');
        res.status(500).json({error: 'Erro ao buscar resumo financeiro'});
    }
};

const getTransacaoById = async (req, res) => {
  try {
    // Extrai o ID da transação dos parâmetros da URL.
    const { id } = req.params;

    // Define a query SQL para buscar uma transação pelo ID.
    const transacao = await pool.query('SELECT * FROM tb_transacoes WHERE id = $1',
       [id] 
    );
    if (transacao.rows.length === 0) {
      return res.status(404).json({ error: 'Transação não encontrada.' });
    }

    res.status(200).json(transacao.rows[0]);
  } catch (err) {
    console.error('Erro ao buscar transação por ID:', err);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};

const deleteTransacao = async (req, res) => {
  try {
    const { id } = req.params;
    const transacao = await pool.query(
      'DELETE FROM tb_transacoes WHERE id = $1 RETURNING *',
      [id]
    );

    if (transacao.rowCount === 0) {
      return res.status(404).json({ error: 'Transação não encontrada.' });
    }

    res.status(200).json({ mensagem: 'Transação deletada com sucesso.'});
  } catch (err) {
    console.error('Erro ao deletar transação:', err);
    res.status(500).json({ error: 'Erro ao deletar transação.' });
  }
};

module.exports = {
    addTransacao,
    getTransacao,
    getResumoFinanceiro,
    getTransacaoById,
    deleteTransacao
};