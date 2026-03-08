import type { Express } from "express";
import express from "express";
import cors from "cors";
import ipAddressMiddleware from "./ip-address";

const allowedOrigins = [
  "http://localhost:5173",
  "https://tini-tiny.vercel.app"
];

export function globalMiddleWareController  (app: Express) {
  
  app.set('trust proxy', 'loopback')
  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (e.g. mobile apps, curl, Postman)
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(null,false);
        }
      },
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true, // Enable if you use cookies or auth headers
    })
  );
  app.options("*", cors());
  app.use(express.json());
  app.use(ipAddressMiddleware);
}
