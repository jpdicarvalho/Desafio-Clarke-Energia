import request from 'supertest';
import { startServer } from '../src/index';
import prisma from '../src/config/database';
let httpServer;
beforeAll(async () => {
    const server = await startServer();
    httpServer = server.httpServer;
});
afterAll(async () => {
    await prisma.$disconnect();
    httpServer.close();
});
describe("Testes na API GraphQL de Fornecedores", () => {
    const queryFornecedores = `
        query GetFornecedores($consumo: Int!) {
            fornecedores(consumo: $consumo) {
                id
                nome
                custo_por_kwh
                limite_minimo_kwh
                avaliacaoMedia
                totalAvaliacoes
                clientesAtendidos
            }
        }
    `;
    test("✅ Deve retornar fornecedores compatíveis com o consumo informado", async () => {
        const response = await request(httpServer)
            .post('/graphql')
            .send({
            query: queryFornecedores,
            variables: { consumo: 200 }
        });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("data");
        expect(response.body.data.fornecedores).toBeInstanceOf(Array);
        expect(response.body.data.fornecedores.length).toBeGreaterThanOrEqual(0);
    });
    test("❌ Deve retornar erro para consumo inválido (zero)", async () => {
        const response = await request(httpServer)
            .post('/graphql')
            .send({
            query: queryFornecedores,
            variables: { consumo: 0 }
        });
        expect(response.status).toBe(400);
        expect(response.body.errors[0].message).toBe("O consumo deve ser um número inteiro maior que zero.");
    });
    test("❌ Deve retornar erro para consumo inválido (texto)", async () => {
        const response = await request(httpServer)
            .post('/graphql')
            .send({
            query: queryFornecedores,
            variables: { consumo: "invalido" }
        });
        expect(response.status).toBe(400);
        expect(response.body.errors[0].message).toBe("O consumo deve ser um número inteiro maior que zero.");
    });
    test("✅ Deve retornar um array vazio quando não houver fornecedores compatíveis", async () => {
        const response = await request(httpServer)
            .post('/graphql')
            .send({
            query: queryFornecedores,
            variables: { consumo: 9999999 }
        });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("data");
        expect(response.body.data.fornecedores).toEqual([]);
    });
});
