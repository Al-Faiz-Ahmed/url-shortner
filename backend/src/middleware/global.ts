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
  // app.use(cors({
  //   origin: function (origin, callback) {
  //     // allow requests with no origin (like Postman)
  //     if (!origin) return callback(null, true);

  //     if (allowedOrigins.includes(origin)) {
  //       return callback(null, true);
  //     } else {
  //       return callback(null, false);
  //     }
  //   },
  //   methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  //   credentials: true
  // }));
  app.use(cors({
    origin: allowedOrigins, // Replace with your frontend's actual domain
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Explicitly allow methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Explicitly allow headers
    credentials: true // Allow cookies, if needed
  }));
  app.options("*", cors());
  app.use(express.json());
  app.use(ipAddressMiddleware);
}
