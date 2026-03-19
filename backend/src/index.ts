import express, { type Request, type Response } from "express";
import { createYoga } from "graphql-yoga";
import { globalMiddleWareController } from "./middleware/global";
import { envConfig } from "./lib/config/env-config";
import { schema } from "./graphql";
import { createContext } from "./graphql/context/context";
import { GenUrlService } from "./services/gen-url.service";

const app = express();
const yoga = createYoga({
  schema,
  graphiql: envConfig.ENV !== "production",
  context: async ({ request }) => createContext(request),
});

globalMiddleWareController(app);

app.get("/", (_req, res) => {
  res.json({ message: "Server Root Page served succesfully" });
});

app.use("/api/graphql", yoga);

// Short URL redirect: only single-segment paths (e.g. /ae5tf); nested paths -> 404
app.get("/api/find/:id", async (req: Request, res: Response) => {

  const shortCode = req.params.id as string;

  const originalUrl = await GenUrlService.resolveShortCode(shortCode);
  if (!originalUrl) {
    return res.status(404).json({ error: "Short link not found or blocked by provider" });
  }
  return res.json({data:originalUrl});
});

app.use((req: Request, res: Response) => {
  res.status(404).json({message:"404 Page Not Found"});
});



// prevent this from vercel deployment
if (process.env.NODE_ENV !== "production") {
  app.listen(envConfig.PORT,"0.0.0.0", () => {
    console.log(`Server Started on http://localhost:${envConfig.PORT}`);
  });
}


export default app;
