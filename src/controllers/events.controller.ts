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
            console.log(event);
            
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

            const userId = req.body.user.id
            const deletedOffer = await EventsService.deleteEvent(id, userId)
            res.status(200).json(deletedOffer)
        }catch(error){
            next(error)
        }
    }

    static async createEvent(req: Request, res: Response, next: NextFunction) {
        try {
            const { title, description, location, imageUrl, date} = req.body;
            console.log(req.body);
            const organizerId = req.body.user.id
            const date2 = new Date()
            const newEvent = await EventsService.createEvent(title, description,date2, location, imageUrl, organizerId);
            res.status(201).json(newEvent);
        }
        catch (error) {
            //res.status(409).json({ message: 'Fallo al crear el evento' });
            next(error)
        }
    }
}