const Cliente = require('../../core/domain/cliente');

class ClienteRepository {
    async addCliente(clienteData) {
        const existingClient = await this.getClienteByClienteId(clienteData.clienteId);
        if (existingClient) {
            throw new Error('Cliente com este ID já existe.');
        }
        const cliente = new Cliente(clienteData);
        await cliente.save();
        return cliente;
    }

    async getClienteByClienteId(clienteId) {
        return Cliente.findOne({ clienteId });
    }

    async findClienteByCPF(cpf) {
        return Cliente.findOne({ cpf });
    }

    async findClienteByNome(nome) {
        return Cliente.findOne({ nome });
    }

    async findClienteByEmail(email) {
        return Cliente.findOne({ email });
    }

    async getAllClientes() {
        return Cliente.find({});
    }
}

module.exports = new ClienteRepository();
