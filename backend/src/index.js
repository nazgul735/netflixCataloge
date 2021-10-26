import { ApolloServer} from "apollo-server";
import mongoose from "mongoose";
import { resolvers }  from "./resolvers.js";
import { typeDefs }   from "./typeDefs.js";
import { mongoDBURL } from "./config.js";

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
<<<<<<< HEAD
    context:({ req }) =>{
      return req;
    }
=======
    context: ({req})=>({req})
>>>>>>> 5bc86fdc35b2d744990d191e574130c9d946557e
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

