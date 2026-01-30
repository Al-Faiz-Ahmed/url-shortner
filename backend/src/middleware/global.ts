import type { Express } from "express";
import express from "express";
import cors from "cors";
import ipAddressMiddleware from "./ip-address";

export function globalMiddleWareController  (app: Express) {
  app.use(express.json());
  app.set('trust proxy', true)
  app.use(cors());
  app.use(ipAddressMiddleware);
}
