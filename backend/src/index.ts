import mongoose from "mongoose"
import { ApolloServer } from "apollo-server";
import { prop, getModelForClass } from "@typegoose/typegoose";
import { buildSchema } from "type-graphql";
import { MovieResolver, UserResolver, ReviewResolver }  from "./resolvers";
import { typeDefs }   from "./typeDefs";
import { mongoDBURL } from "./config";

const startServer = async () => {

  const schema = await buildSchema({
    resolvers: [ MovieResolver, UserResolver, ReviewResolver ],
    emitSchemaFile: true
  })
  const server = new ApolloServer({
    schema,
    context: ({req})=>({req: Object})
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
