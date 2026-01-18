import type { Express } from "express";
import express from "express";
import cors from "cors";

export const globalMiddleWareController = (app: Express) => {
  app.use(express.json());
  app.use(cors());
}
