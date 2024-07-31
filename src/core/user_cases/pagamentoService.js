const axios = require('axios');
require('dotenv').config();
const pedidoRepository = require('../../infrastructure/repositories/pedidoRepository');
const clienteRepository = require('../../infrastructure/repositories/clienteRepository');
const produtoRepository = require('../../infrastructure/repositories/produtoRepository');
const Pagamento = require('../../core/domain/pagamento');

class PagamentoService {
    async criarPagamento(pedidoId) {
        const pedido = await pedidoRepository.getPedidoByPedidoId(pedidoId);
        if (!pedido) {
            throw new Error('Pedido não encontrado');
        }

        const cliente = await clienteRepository.getClienteByClienteId(pedido.cliente);
        if (!cliente) {
            throw new Error('Cliente não encontrado');
        }

        const produtos = await Promise.all(pedido.produtos.map(async (item) => {
            const produto = await produtoRepository.getProdutoByProdutoId(item.produto);
            return {
                name: produto.nomeProduto,
                quantity: item.quantidade,
                unit_amount: produto.precoProduto * 100
            };
        }));

        const requestBody = {
            reference_id: pedidoId,
            customer: {
                name: cliente.nomeCliente,
                email: cliente.email,
                tax_id: cliente.cpf,
                phones: [
                    {
                        country: "55",
                        area: "41",
                        number: "999999999",
                        type: "MOBILE"
                    }
                ]
            },
            items: produtos,
            qr_codes: [
                {
                    amount: {
                        value: pedido.total * 100
                    },
                    expiration_date: new Date(Date.now() + 3600 * 1000).toISOString()
                }
            ],
            shipping: {
                address: {
                    street: "meu endereço",
                    number: "0000",
                    complement: "loja 01",
                    locality: "Meu bairro",
                    city: "Curitiba",
                    region_code: "PR",
                    country: "BRA",
                    postal_code: "80000000"
                }
            },
            notification_urls: [
                "https://meusite.com/notificacoes"
            ]
        };

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': process.env.PAGSEGURO_AUTH_TOKEN
        };

        const response = await axios.post('https://sandbox.api.pagseguro.com/orders', requestBody, { headers });

        const qrCodeLink = response.data.qr_codes[0].links[1].href;

        const pagamento = new Pagamento({
            pedidoId: pedidoId,
            valor: pedido.total,
            status: 'Pendente',
            qrCodeLink: qrCodeLink
        });

        await pagamento.save();

        return pagamento;
    }
}

module.exports = new PagamentoService();
