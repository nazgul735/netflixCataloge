import * as mongoose from "mongoose";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "graphql";
import { mongoDBURL } from "./config";
import { typeDefs } from "./resolvers/typeDefs";

const startServer = async () => {

    const schema = await buildSchema({
      resolvers: [ MovieResolver, UserResolver, ReviewResolver ],
      emitSchemaFile: true
    })
    const server = new ApolloServer({
      schema,
      context: ({req:Request})=>({req:Request})
    });
  
    mongoose.connect(mongoDBURL)
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