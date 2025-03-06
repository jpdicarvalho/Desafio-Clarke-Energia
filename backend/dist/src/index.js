import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { typeDefs } from './schemas/fornecedorSchema.js';
import { resolvers } from './resolvers/fornecedorResolver.js';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const server = new ApolloServer({ typeDefs, resolvers });
export const startServer = async () => {
    await server.start();
    app.use('/graphql', expressMiddleware(server));
    return new Promise((resolve) => {
        const PORT = process.env.PORT || 4000;
        const httpServer = createServer(app);
        httpServer.listen(PORT, () => {
            console.log(`Server ready at: http://localhost:${PORT}/graphql`);
            resolve({ httpServer });
        });
    });
};
if (process.env.NODE_ENV !== 'test') {
    startServer();
}
