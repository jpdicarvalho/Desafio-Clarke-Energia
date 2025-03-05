import { gql } from "@apollo/client";

export const GET_FORNECEDORES = gql`
    query GetFornecedores($consumo: Int!) {
        fornecedores(consumo: $consumo) {
            id
            nome
            logo
            estado
            custo_por_kwh
            limite_minimo_kwh
            avaliacaoMedia
            totalAvaliacoes
            clientesAtendidos
        }
    }
`;
