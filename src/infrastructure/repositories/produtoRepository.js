const Produto = require('../../core/domain/produto');

class ProdutoRepository {
    async addProduto(produtoData) {
        const existingProduct = await Produto.findOne({ nomeProduto: produtoData.nomeProduto });
        if (existingProduct) {
            throw new Error('Produto com este nome já existe.');
        }
        const produto = new Produto(produtoData);
        await produto.save();
        return produto;
    }

    async getProdutoByProdutoId(produtoId) {
        return Produto.findOne({ produtoId });
    }

    async getAllProdutos() {
        return Produto.find({});
    }

    async getProdutosByCategoria(categoria) {
        return Produto.find({ categoriaProduto: categoria });
    }

    async updateProduto(produtoId, updateData) {
        return Produto.findOneAndUpdate({ produtoId }, updateData, { new: true });
    }

    async deleteProduto(produtoId) {
        return Produto.findOneAndDelete({ produtoId });
    }
}

module.exports = new ProdutoRepository();