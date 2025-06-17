import { startStandaloneServer } from "@apollo/server/standalone";
import dbConnect from "./utils/dbConnect";
import dotenv from "dotenv";
import createApolloServer from "./graphql";
import { getContext } from "./utils/auth";

dotenv.config();

dbConnect()
  .then(() => {
    return createApolloServer();
  })
  .then(async (server) => {
    const { url } = await startStandaloneServer(server, {
      listen: { port: process.env.PORT ? Number(process.env.PORT) : 8000 },
      context: getContext,
    });
    console.log(`🚀 Server ready at: ${url}`);
  })
  .catch((error) => {
    console.error("Error starting server:", error);
    process.exit(1);
  });
