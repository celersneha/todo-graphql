import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./typedefs/typedef";
import resolvers from "./resolvers/resolvers";

async function createApolloServer() {
  const server = new ApolloServer({
    typeDefs: `#graphql
    ${typeDefs}
    }`,

    resolvers: {
      resolvers,
    },
  });
  return server;
}

export default createApolloServer;
