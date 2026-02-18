import type { Request, Response, NextFunction } from "express";

/**
 * Ensures the client IP is available on a header so that the Fetch Request
 * (used by GraphQL Yoga) can read it via getClientIp(). The global Request
 * has no .ip or .socket; it only has headers.
 */
const ipAddressMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const existing = req.headers["x-real-ip"] ?? req.headers["x-forwarded-for"];
  if (!existing) {
    const ip = req.ip ?? req.socket?.remoteAddress ?? "";
    (req.headers as Record<string, string>)["x-real-ip"] = String(ip);
    console.log(String(ip), "From ip-address")
  }
  next();
};

export default ipAddressMiddleware;