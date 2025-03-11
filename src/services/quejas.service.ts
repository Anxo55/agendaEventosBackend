import { prisma } from "../database/database";

export class QuejasService {
    static async getAll(titulo: string = '') {
        return await prisma.queja.findMany({
            where: {
                titulo: {
                    contains: titulo
                }
            },
            select: {
                id: true,
                titulo: true,
                descripcion: true
            }
        });
    }
    

    
    //Metodo para crear un nuevo evento
    static async createQueja(titulo: string, descripcion: string) {
        return await prisma.queja.create({
            data: {
                titulo,
                descripcion,
            },  
                select: {
                    id: true,
                    titulo: true,
                    descripcion: true
                }
        });
    }
    
    }
