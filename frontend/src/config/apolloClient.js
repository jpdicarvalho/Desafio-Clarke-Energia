import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient ({
    uri: "https://desafio-clarke-energia-api-graphql.up.railway.app/",
    cache: new InMemoryCache(),
});

export default client;
export { gql };