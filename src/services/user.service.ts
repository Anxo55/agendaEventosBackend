import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// alta coexion bajo acoplamiento

// usar un patron singleton
const prisma = new PrismaClient();

// Esta clase se encarga de gestionar los usuarios
export class UserService{

  static async getByEmail(email: string) {
    const findUser = await prisma.user.findUnique({ where: { email: email }, omit: {password:true} });
    if (!findUser) throw new Error("User not found");
    return findUser;
  }

  static async getById(id: number) {
    const findUser = await prisma.user.findUnique({ where: { id: id } });
    if (!findUser) throw new Error("User not found");
    return findUser;
  }

  static async getAll() {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true
      }
    }) 
    return users;
  }
}
