import request from 'supertest';
import { startServer } from '../src/index.js';
describe('Testando a Query fornecedores', () => {
    let httpServer;
    beforeAll(async () => {
        const servers = await startServer();
        httpServer = servers.httpServer;
    });
    test('Deve retornar fornecedores que atendem ao consumo informado', async () => {
        const response = await request(httpServer)
            .post('/graphql')
            .send({
            query: `
                    query {
                        fornecedores(consumo: 20000) {
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
                `,
        });
        expect(response.status).toBe(200);
        expect(response.body.data.fornecedores.length).toBeGreaterThan(0);
    });
    afterAll(() => {
        if (httpServer) {
            httpServer.close();
        }
    });
});
