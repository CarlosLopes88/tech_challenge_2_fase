const Produto = require('../../core/domain/produto');
const Pedido = require('../../core/domain/pedido');
const produtoRepository = require('../../infrastructure/repositories/produtoRepository');

class PedidoService {
    constructor(produtoRepository, pedidoRepository) {
        this.produtoRepository = produtoRepository;
        this.pedidoRepository = pedidoRepository;
    }

    async calcularTotal(pedidoData) {
        let total = 0;
        for (const item of pedidoData.produtos) {
            const produto = await this.produtoRepository.getProdutoByProdutoId(item.produto);
            if (produto) {
                item.nomeProduto = produto.nomeProduto;
                item.precoProduto = produto.precoProduto;
                total += item.quantidade * produto.precoProduto;
            } else {
                throw new Error('Produto não encontrado');
            }
        }
        pedidoData.total = total;
        return pedidoData;
    }

    async criarPedido(pedidoData) {
        const pedidoCalculado = await this.calcularTotal(pedidoData);
        const pedido = new Pedido(pedidoCalculado);
        await pedido.save();
        return pedido;
    }
}

module.exports = PedidoService;