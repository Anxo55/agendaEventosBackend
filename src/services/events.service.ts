import { prisma } from "../database/database";
import { HttpException } from "../exceptions/httpException";

export class EventsService {
    static async getAll(title: string = '') {
        return await prisma.event.findMany({
            where: {
                title: {
                    contains: title
                }
            }
        })
    }

    static async getById(id: number) {
        const findEvent = await prisma.event.findUnique({ where: {id}})
        if(!findEvent) throw new HttpException(404, 'Event not found')
         return findEvent
    }

    static async deleteEvent(id:number) {
        
        try {
            return await prisma.event.delete({ where: { id } });
        } catch (error) {
            throw new HttpException(404, "Offer not found");
        }
        
    }

    //Metodo para crear un nuevo evento
    static async createEvent(title: string, description: string, date:Date, location: string, imageUrl: string, organizerId: number) {
        return await prisma.event.create({
            data: {
                title,
                description,
                location,
                imageUrl,
                organizerId,
                date // Se toma del token, no del frontend
            }
        });
    }
    
    }
