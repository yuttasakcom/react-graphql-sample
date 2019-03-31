import "@babel/polyfill";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import { importSchema } from "graphql-import";
import jwt from "jsonwebtoken";
import cors from "cors";

import resolvers from "./resolvers";
import Recipe from "./models/Recipe";
import User from "./models/User";

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(`MongoDB Connected.`))
  .catch(err => {
    console.log("Check docker-compose up -d !:", err);
    process.exit(1);
  });

const app = express();
app.set("port", process.env.PORT || "4000");

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));

app.use(async (req, res, next) => {
  const token = req.headers["authorization"];

  if (token !== "null") {
    try {
      const currentUser = await jwt.verify(token, process.env.SECRET);
      req.currentUser = currentUser;
    } catch (error) {
      console.error(error);
    }
  }

  next();
});

const typeDefs = importSchema("./server/schema.graphql");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ Recipe, User, req }),
});

server.applyMiddleware({ app });

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}/graphql`);
});
