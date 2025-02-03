import { NextFunction } from "express";
import { EventsService } from "../services/events.service";

export class EventsController {
    static async getAll(req: Request, res: Response, next:NextFunction) {
        /* try {
            const events = await EventsService.getAll();
            res.status(200).json(events);
        }
        catch (error) {
            res.status(409).json({ message: 'Fallo al listar los eventos', error });
        } */
    }
}