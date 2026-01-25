import type { Request,Response,NextFunction } from "express";
import {config} from "../lib/config/env-config"

const ipAddressMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const ipAddress = req.ip;
 
   console.log(ipAddress);
  
  
  next();
}

export default ipAddressMiddleware;