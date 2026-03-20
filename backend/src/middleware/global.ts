import type { Express } from "express";
import express from "express";
import cors from "cors";
import type { CorsOptions } from "cors";
import ipAddressMiddleware from "./ip-address";



const allowedOrigins: string[] = [
  "http://localhost:5173",
  "https://tini-tiny.vercel.app",
];

const corsOptions: CorsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void,
  ) => {
    // Allow requests with no origin (Postman, server-to-server calls)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true); // ✅ Allowed
    } else {
      callback(new Error(`CORS Policy: Origin "${origin}" is not allowed.`)); // ❌ Blocked
    }
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

export function globalMiddleWareController(app: Express) {
  app.set("trust proxy", "loopback");
  app.use(cors(corsOptions));
  app.options('{*splat}', cors(corsOptions));
  app.use(express.json());
  app.use(ipAddressMiddleware);
}
