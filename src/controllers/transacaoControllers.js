const pool = require('./../config/db');

const createTransation = async (req, res) => {
    const {descricao, valor, tipo} = req.body;

    try{
        const transacao = await pool.query(
            'INSERT INTO transacoes (descricao, valor, tipo) VALUES (1$, $2, $3) RETURNING *',
            [descricao, valor, tipo]
        );
        res.status(200).json(transacao.rows[0])
    } catch (err) {
        console.error('Error ao criar transação', err)
        res.status(500).json({error: 'Erro ao criar transação'})
    }
};

const getTransation =  async (_, res) => {
        try{
        const transacao = await pool.query('SELECT * FROM transacoes');
        res.status(200).json(transacao.rows);
    } catch (err) {
        console.error('Erro ao buscar transações', err);
        res.status(500).json({error: 'Erro ao buscar transações'});
    }
};

const getResumoFinanceiro = async (req, res) => {
    try{
        const entradasQuery = await pool.query(
            'SELECT COALESCE(SUM(valor), 0) AS total_entradas FROM transacoes'
        );
        const saidasQuery = await pool.query(
            'SELECT COALESCE(SUM(valor), 0) AS total_saidas FROM transacoes'
        )

        const total_entradas = parseFloat(entradasQuery.rows[0].total_entradas);
        const total_saidas = parseFloat(saidasQuery.rows[0].total_saidas);
        const saldo = total_entradas - total_saidas;

        res.status(200).json({total_entradas, total_saidas, saldo});
    } catch (err) {
        console.error('Erro ao buscar resumo financeiro');
        res.satus(500).json({error: 'Erro ao buscar resumo financeiro'});
    }
};