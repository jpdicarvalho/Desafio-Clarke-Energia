export const typeDefs = `#graphql
    type Fornecedor {
        id: ID!
        nome: String!
        logo: String!
        estado: String!
        custo_por_kwh: Float!
        limite_minimo_kwh: Int!
        avaliacoes: [Avaliacao]
        avaliacaoMedia: Float
        totalAvaliacoes: Int
        clientesAtendidos: Int
    }

    type Avaliacao {
        id: ID!
        fornecedorId: Int!
        nota: Float!
    }

    type Query {
        fornecedores(consumo: Int!): [Fornecedor]
    }
`;
