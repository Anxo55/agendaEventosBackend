import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

const TOKEN_PASSWORD = process.env.TOKEN_PASSWORD || "pass";

// TODO: quita el any
export const isAuthenticate = (req: Request, res: Response, next:NextFunction):any => {

  const token = req.headers.authorization?.split(" ")[1]
  if (!token) return res.status(401).json({ error: "Acess denied" });

  try {
    const tokenDecodificado = jwt.verify(token, TOKEN_PASSWORD);
    req.body.user = tokenDecodificado 
    next()
  } catch (error) {
    res.status(401).json({ error: "Invalid token" })
  }

};

export const isAdmin = (req: Request, res:Response, next:NextFunction): any => {

  const {user} = req.body

  if(!user || user.role != 'admin') {
    return res.status(403).json({ error: "Acces denied, only admins" });
  }

}
