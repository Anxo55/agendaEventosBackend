import { prisma } from "@/database/database";
import { HttpException } from "@/exceptions/httpException";

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
}