import { Request, Response, NextFunction } from "express";
import { HttpException } from "../exceptions/httpException";
import { QuejasService } from "../services/quejas.service";



export class QuejasController {
    static async getAll(req: Request, res: Response, next:NextFunction) {
        try {
            const quejas = await QuejasService.getAll();
            res.status(200).json(quejas);
        }
        catch (error) {
            next(error)
        }
    }

    static async createQueja(req: Request, res: Response, next: NextFunction) {
        try {
            const { title, description} = req.body;
            console.log("Datos recibidos en el backend: ",req.body);

            if(!title || !description) {
                throw new HttpException(400, "Faltan datos obligatorios");
            }

            
            const newQueja = await QuejasService.createQueja(title, description);
            res.status(201).json(newQueja);
        }
        catch (error) {
            //res.status(409).json({ message: 'Fallo al crear el evento' });
            next(error)
        }
    }
}