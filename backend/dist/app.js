"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const apollo_server_1 = require("apollo-server");
const config_1 = require("./config");
const resolvers_1 = require("./resolvers/resolvers");
const typeDefs_1 = require("./resolvers/typeDefs");
//npx tsc; node dist/app.js
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const server = new apollo_server_1.ApolloServer({
        typeDefs: typeDefs_1.typeDefs,
        resolvers: resolvers_1.resolvers,
        context: ({ req: Request }) => ({ req: Request })
    });
    mongoose_1.default.connect(config_1.mongoDBURL)
        .then(() => {
        console.log("Database connected!");
        return server.listen({ port: 4000 });
    })
        .then(({ url }) => {
        console.log(`🚀🚀🚀  Server ready at ${url}`);
    })
        .catch(err => {
        console.error(err.reason);
    });
});
startServer();
