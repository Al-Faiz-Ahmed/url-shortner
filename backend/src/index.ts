import express, { type Request, type Response } from "express";
// import { createYoga, YogaInitialContext } from "graphql-yoga";
import { globalMiddleWareController } from "./middleware/global";
import { config } from "./lib/config/env-config";
// import {schema} from "./graphql"
// import { createContext } from "./graphql/context/context";


const app = express();
// const yoga = createYoga({
//   schema,
//   graphiql: true,
//   context : async ({request}) => createContext(request),
  
// });

globalMiddleWareController(app);

app.get("/", (_req, res) => {
  res.json({message:"Server Root Page served"})
});


// app.use("/graphql", yoga);

app.listen(config.PORT, () => {
  console.log(`Serever Started on http://localhost:${config.PORT}`);
});

