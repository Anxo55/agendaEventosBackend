import { HttpException } from "../exceptions/httpException";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const isAuthenticated = (req: Request, res: Response, next: NextFunction):any => {
    /*
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: "No token provided" });
    }
    

    const token = authHeader.split(" ")[1]; // 👈 Obtener el token sin "Bearer"
    if (!token) {
        return res.status(401).json({ error: "Token format is invalid" });
    }
    */
    const token = req.cookies.token;
    if(!token) next(new HttpException(403, "Invalid token"))
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_PASSWORD || "clave-super-secreta");
        req.body.user = decoded; // Guardar usuario en el request
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
