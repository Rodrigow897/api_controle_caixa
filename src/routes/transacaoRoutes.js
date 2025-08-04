const express = require('express');

const transacaoController = require('../controllers/transacaoController');

const router = express.Router();

router.post('/', transacaoController.addTransacao);
router.get('/', transacaoController.getTransacao);
router.get('/resumo', transacaoController.getResumoFinanceiro);
router.get('/:id', transacaoController.getTransacaoById);
router.delete('/:id', transacaoController.deleteTransacao);

module.exports = router;
