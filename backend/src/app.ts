import mongoose from "mongoose";
import { ApolloServer } from "apollo-server";
import { mongoDBURL } from "./config";
import { resolvers } from "./resolvers/resolvers";
import { typeDefs } from "./resolvers/typeDefs";
//npx tsc; node dist/app.js
const startServer = async (): Promise<void> => {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({req:Request})=>({req:Request})
    });
    mongoose.connect(mongoDBURL)
    .then(()=> {
      console.log("Database connected!");
      return server.listen({port:4000});
      })
    .then(({ url }) => {
      console.log(`🚀🚀🚀  Server ready at ${url}`);
    })
    .catch(err => {
      console.error(err.reason)
    });
  };
  startServer();
  