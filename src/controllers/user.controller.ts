import { Request, Response } from "express";
import { UserService } from "../services/user.service";


export class UserController{
    
    static async profile (req:Request, res:Response) {

        try {
            // QUIEN???
            const { email } = req.body.user
            // La constante del email va entre llaves por que le esta desestructurando
            const user = await UserService.getByEmail(email)
            res.status(200).json(user)
        } catch (error) {
            res.status(401).json({message:'Token invalido '+error})
        }
    }

    static async getAll (req:Request, res:Response) {

        try {
            const user = await UserService.getAll();
            res.status(200).json(user);
          } catch (error){
            res.status(409).json({message:'Fallo al listar a los usuarios',error});
          }
    }

}
