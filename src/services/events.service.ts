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

    static async deleteEvent(id: number, userId: number) {
        const event = await prisma.event.findUnique({ where: { id } });
    
        if (!event) throw new HttpException(404, "Event not found");
    
        // Verifica si el usuario que intenta eliminar es el creador
        if (event.organizerId !== userId) {
            throw new HttpException(403, "You don't have permission to delete this event");
        }
    
        return await prisma.event.delete({ where: { id } });
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
