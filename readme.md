# Order System API

## Objetivo

Este projeto visa desenvolver um sistema de controle de pedidos para uma lanchonete em expansão, permitindo gerenciar pedidos de forma eficiente e assegurar que os clientes recebam seus pedidos corretamente e em tempo hábil.

Utilizamos a Clean Architecture para o desenvolvimento, focando na separação entre o domínio de negócios e a infraestrutura, o que facilita a manutenção e a expansão do sistema.

## Funcionalidades

- **Gerenciamento de Clientes**:
  - Registrar e atualizar informações dos clientes.
  - Buscar informações de clientes por ID ou CPF.

- **Gerenciamento de Produtos**:
  - Adicionar, atualizar e excluir produtos.
  - Buscar produtos por ID e categoria.

- **Gerenciamento de Pedidos**:
  - Criar novos pedidos.
  - Acompanhar e atualizar o status dos pedidos.
  - Processar pagamentos e associar ao pedido.

- **Acompanhamento de Pedidos**:
  - Monitorar o progresso dos pedidos em tempo real.

## Tecnologias e Frameworks Utilizados

- **Node.js**: Ambiente de execução JavaScript no servidor.
- **Express**: Framework web para Node.js.
- **MongoDB**: Banco de dados NoSQL para armazenamento de dados.
- **Mongoose**: ODM para MongoDB.
- **Swagger UI**: Para documentação interativa da API.
- **Docker** e **Kubernetes**: Para contêinerização e gerenciamento de ambientes.

## Preparar o Ambiente

### Pré-requisitos

- **Docker** e **Kubernetes**: Necessários para rodar a aplicação em contêineres.
- **Node.js**: Opcional, se desejar rodar a aplicação fora do Docker.

### Passos para Rodar a Aplicação

1. **Clone o Repositório**:

    ```sh
    git clone https://github.com/seu-usuario/tech_challenge_2_fase.git
    cd tech_challenge_2_fase
    ```

2. **Configurar as Variáveis de Ambiente**:

    Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

    ```env
    MONGO_USERNAME=admin
    MONGO_PASSWORD=password
    MONGO_HOST=mongodb
    MONGO_PORT=27017
    MONGO_DATABASE=order_system
    PAGSEGURO_AUTH_TOKEN=Bearer 1209bdb1-6f3a-4fa5-9504-693ac0fd049ea6b1202a435499b6b5c70a765fd3a49e9dc5-dbf8-465c-ada0-07e3cf4dbeff
    ```

3. **Iniciar os Serviços com Kubernetes**:

    ```sh
    kubectl config use-context docker-desktop
    docker build -t tech_challenge_2_fase-node_app:latest .
    kubectl apply -f k8s/
    kubectl get pods
    kubectl get svc
    ```

4. **Acessar a Documentação da API**:

    Abra seu navegador e acesse `http://localhost:30010/api-docs` para visualizar a documentação da API.

    Também temos a opção de executar via postman, importando a collection: tech_challenge.postman_collection.json

## Estrutura do Projeto

```plaintext
/order_system
|-- /k8s
|   |-- mongodb-deployment.yaml
|   |-- mongodb-service.yaml
|   |-- appnode-deployment.yaml
|   `-- appnode-service.yaml
|-- /docs
|    `-- openapi.yaml
|-- /src
|   |-- /core
|   |   |-- /domain
|   |   |   |-- cliente.js
|   |   |   |-- pagamento.js
|   |   |   |-- pedido.js
|   |   |   `-- produto.js
|   |   |-- /use_cases
|   |       |-- pagamentoServices.js
|   |       `-- pedidoUseServices.js    
|   |-- /application
|   |   |-- /interfaces
|   |   |   |-- api
|   |   |   |   |-- clienteRoutes.js
|   |   |   |   |-- pagamentoRoutes.js
|   |   |   |   |-- pedidoRoutes.js
|   |   |   |   |-- produtoRoutes.js
|   |   |   |   `-- webhookRoutes.js
|   |   |   `-- web
|   |   |       `-- server.js
|   |-- /infrastructure
|   |   |-- /repositories
|   |   |   |-- clienteRepository.js
|   |   |   |-- pedidoRepository.js
|   |   |   `-- produtoRepository.js
|   |   `-- dbconnect.js
|-- /test
|-- .env
|-- .gitignore
|-- dockercompose.yaml
|-- dockerfile
|-- package-lock.json
|-- package.json
`-- readme.md
