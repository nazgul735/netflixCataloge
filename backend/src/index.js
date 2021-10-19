import { ApolloServer} from "apollo-server";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";
import mongoose from "mongoose";
import {mongoDBURL} from "../config.js";
const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers
  });


  mongoose.connect(mongoDBURL, {useNewUrlParser:true, useUnifiedTopology:true})
  .then(()=> {
    console.log("Database connected!");
    return server.listen({port:4000});
    }
    )
  .then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
};
startServer();
