import { ApolloServer} from "apollo-server";
import mongoose from "mongoose";

import { resolvers }  from "./resolvers";
import { typeDefs }   from "./typeDefs";
import { mongoDBURL } from "./config.js";

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req, pubsub })
  });

  mongoose.connect(mongoDBURL, {useNewUrlParser:true, useUnifiedTopology:true, serverSelectionTimeoutMS: 2000})
  .then(()=> {
    console.log("Database connected!");
    return server.listen({port:4000});
    })
  .then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  })
  .catch(err => {
    console.error(err.reason)
  });
};
startServer();
