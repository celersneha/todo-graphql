import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

async function createApolloServer() {
  const server = new ApolloServer({
    typeDefs: `#graphql
    type Query {
        hello: String
        }
        `,

    resolvers: {
      Query: {
        hello: () => "Hello world!",
      },
    },
  });
  return server;
}

export default createApolloServer;
