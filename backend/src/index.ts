import express, { type Request, type Response } from "express";
import { createYoga, YogaInitialContext } from "graphql-yoga";
import { globalMiddleWareController } from "./middleware/global";
import { envConfig } from "./lib/config/env-config";
import {schema} from "./graphql"
import { createContext } from "./graphql/context/context";


const app = express();
const yoga = createYoga({
  schema,
  graphiql: envConfig.ENV !== "production",
  context : async ({request}) => createContext(request),
  
});

globalMiddleWareController(app);

app.get("/", (_req, res) => {
  res.json({message:"Server Root Page served succesfully"})
});


app.use("/graphql", yoga);

app.listen(envConfig.PORT,"0.0.0.0", () => {
  console.log(`Server Started on http://localhost:${envConfig.PORT}`);
});

