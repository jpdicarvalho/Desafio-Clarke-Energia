import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schemas/fornecedorSchema.js'; // Certifique-se de que está correto
import { resolvers } from './resolvers/fornecedorResolver.js';
import dotenv from 'dotenv';

dotenv.config();

const server = new ApolloServer({
    typeDefs,
    resolvers,
});


const PORT = process.env.PORT || 4000;

const startServer = async () => {
    const { url } = await startStandaloneServer(server, {
        listen: { port: Number(PORT) },
    });
    console.log(`🚀 Server ready at: ${url}`);
};

startServer();
