import express from "express";
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import { importSchema } from "graphql-import";

import resolvers from "./resolvers";
import Recipe from "./models/Recipe";
import User from "./models/User";

const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(`MongoDB Connected.`))
  .catch(err => {
    console.log(err);
    process.exit(1);
  });

app.set("port", process.env.PORT || "4000");

const typeDefs = importSchema("./server/schema.graphql");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { Recipe, User },
});
server.applyMiddleware({ app });

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}/graphql`);
});
