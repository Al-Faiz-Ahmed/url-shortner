import type { Express } from "express";
import express from "express";
import cors from "cors";
import ipAddressMiddleware from "./ip-address";

// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://tini-tiny.vercel.app",
// ];

export function globalMiddleWareController(app: Express) {
  app.set("trust proxy", "loopback");
  app.use(cors());
  app.use(express.json());
  app.use(ipAddressMiddleware);
}
