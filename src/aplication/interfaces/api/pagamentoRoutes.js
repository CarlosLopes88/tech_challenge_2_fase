const express = require('express');
const router = express.Router();
const pagamentoService = require('../../../core/user_cases/pagamentoService');

// Rota para criar pagamento
router.post('/:pedidoId', async (req, res) => {
    const { pedidoId } = req.params;
    try {
        const pagamento = await pagamentoService.criarPagamento(pedidoId);
        res.status(201).json(pagamento);
    } catch (error) {
        console.error('Erro ao criar pagamento:', error);
        res.status(500).send({ message: "Erro no servidor", error: error.message });
    }
});

module.exports = router;
