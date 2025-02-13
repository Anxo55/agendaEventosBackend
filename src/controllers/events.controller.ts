import { Request, Response, NextFunction } from "express";
import { EventsService } from "../services/events.service";
import { HttpException } from "../exceptions/httpException";

export class EventsController {
    static async getAll(req: Request, res: Response, next:NextFunction) {
        try {
            const events = await EventsService.getAll();
            res.status(200).json(events);
        }
        catch (error) {
            res.status(409).json({ message: 'Fallo al listar los eventos', error });
        }
    }

    static async getById(req: Request, res: Response, next:NextFunction) {
        try {
            const id = parseInt(req.params.id);
            const event = await EventsService.getById(id);
            res.status(200).json(event);
        }
        catch (error) {
            res.status(409).json({ message: 'Fallo al obtener el evento', error });
        }
    }

    static async deleteEvent(req:Request, res:Response, next:Function) {
        try{
            const id = Number.parseInt(req.params.id)
            if (isNaN(id)) throw new HttpException(400, "Invalid offer ID");

            const deletedOffer = await EventsService.deleteEvent(id)
            res.status(200).json(deletedOffer)
        }catch(error){
            next(error)
        }
    }
}