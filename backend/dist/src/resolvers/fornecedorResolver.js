import prisma from '../config/database.js';
import { GraphQLError } from 'graphql';
export const resolvers = {
    Query: {
        fornecedores: async (_, { consumo }) => {
            // Validação com regex e erro GraphQL correto
            const regexConsumo = /^(?!0$)\d+$/;
            if (!regexConsumo.test(consumo.toString())) {
                throw new GraphQLError("O consumo deve ser um número inteiro maior que zero.", {
                    extensions: { code: "BAD_USER_INPUT" },
                });
            }
            // Filtrando corretamente os fornecedores
            const fornecedores = await prisma.fornecedor.findMany({
                where: { limite_minimo_kwh: { lte: consumo } },
                include: { avaliacoes: true, clientesAtendidos: true },
            });
            return fornecedores.length > 0 ? fornecedores.map(fornecedor => ({
                ...fornecedor,
                avaliacaoMedia: fornecedor.avaliacoes.length > 0
                    ? fornecedor.avaliacoes.reduce((acc, a) => acc + a.nota, 0) / fornecedor.avaliacoes.length
                    : 0,
                totalAvaliacoes: fornecedor.avaliacoes.length,
                clientesAtendidos: fornecedor.clientesAtendidos ? fornecedor.clientesAtendidos.quantidade : 0
            })) : [];
        },
    },
};
