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

app.use("/graphql", yoga);

// Short URL redirect: only single-segment paths (e.g. /ae5tf); nested paths -> 404
app.get("/*splat", async (req: Request, res: Response) => {
  const segments = req.path.split("/"); // "/ae5tf" -> ["ae5tf"], "/asf45/ok" -> ["asf45","ok"]
  if (segments.length !== 2) {
    
    return res.status(404).json({ error: "Page Not Found" });
  }

  const shortCode = segments[1] as string;

  const originalUrl = await GenUrlService.resolveShortCode(shortCode);
  if (!originalUrl) {
    return res.status(404).json({ error: "Short link not found or disabled" });
  }
  res.redirect(302, originalUrl);
});

app.listen(envConfig.PORT,"0.0.0.0", () => {
  console.log(`Server Started on http://localhost:${envConfig.PORT}`);
});

