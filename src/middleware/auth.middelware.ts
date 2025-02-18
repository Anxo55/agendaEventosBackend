import { HttpException } from "../exceptions/httpException";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const isAuthenticated = (req: Request, res: Response, next: NextFunction): any => {
    let token = req.cookies.token; // Intenta obtener el token de las cookies

    if (!token) {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1]; // Obtiene el token del header
        }
    }

    if (!token) {
        return res.status(403).json({ error: "Invalid token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_PASSWORD || "clave-super-secreta");
        req.body.user = decoded; // Guarda el usuario en la request
        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid token" });
    }
};



/* export const isAdmin = (req: Request, res:Response, next:NextFunction): any => {

  const user = req.user

  if(!user || user.role != 'admin') {
    return res.status(403).json({ error: "Acces denied, only admins" });
  }
  next()

} */
