const { ApolloServer} = require("apollo-server");

import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";
import {mongoDBURL} from "./config";

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req, pubsub }) 
  });


  mongoose.connect(mongoDBURL, {useNewUrlParser:true, useUnifiedTopology:true})
  .then(()=> {
    console.log("Database connected!");
    return server.listen({port:4000});
    })
  .then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  })
  .catch(err => {
    console.error(err)
})
startServer();
}
