import request from 'supertest';
import { startServer } from '../src/index';
import prisma from '../src/config/database';

let httpServer: any;

beforeAll(async () => {
    const server = await startServer();
    httpServer = server.httpServer;
});

afterAll(async () => {
    await prisma.$disconnect();
    httpServer.close();
});

describe("Testando API GraphQL de Fornecedores, ", () => {
    const queryFornecedores = `
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

    test("Deve retornar fornecedores compatíveis com o consumo informado", async () => {
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

    test("Deve retornar erro para consumo inválido (número 0 como primeiro digito)", async () => {
        const response = await request(httpServer)
            .post('/graphql')
            .send({
                query: queryFornecedores,
                variables: { consumo: 0 }
            });
    
        expect(response.body).toHaveProperty("errors");
        expect(response.body.errors[0].message).toBe("O consumo deve ser um número inteiro maior que zero.");
        expect(response.body.errors[0].extensions.code).toBe("BAD_USER_INPUT");
    });
    
    test("Deve retornar erro para consumo inválido (texto)", async () => {
        const response = await request(httpServer)
            .post('/graphql')
            .send({
                query: queryFornecedores,
                variables: { consumo: "invalido" }
            });
    
        expect(response.body).toHaveProperty("errors");
        expect(response.body.errors[0].message).toBe(`Variable "$consumo" got invalid value "invalido"; Int cannot represent non-integer value: "invalido"`);
        expect(response.body.errors[0].extensions.code).toBe("BAD_USER_INPUT");
    });
    
    test("Deve retornar um array vazio quando não houver fornecedores compatíveis", async () => {    

        const consumoAlto = 1;
    
        const response = await request(httpServer)
            .post('/graphql')
            .send({
                query: queryFornecedores,
                variables: { consumo: consumoAlto }
            });
    
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("data");
        expect(Array.isArray(response.body.data.fornecedores)).toBe(true);
        expect(response.body.data.fornecedores.length).toBe(0);
    });
    
});
