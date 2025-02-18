import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";


export class AuthController{
    static async register (req:Request, res:Response){
        try {
            console.log("llegate registration");
            
            const userData = req.body
            const newUser = await AuthService.register(userData)
            res.status(201).json({message:'User register successfully', newUser}) 
        } catch (error) {
            res.status(409).json({message:'Fallo al registrar usuario '+error})
        }
        
    }
   static async login (req:Request,res:Response){
    
    try {
        const userData = req.body
        // TODO: validar el body (opcional)
        const token = await AuthService.login(userData.email,userData.password)
        res.cookie('token', token, {
            maxAge: 60*60*1000,
            httpOnly: true,
            secure: false,
            sameSite: 'strict'
        })
        res.status(201).json({message:'Login successfully', token}) 
    } catch (error) {
        res.status(409).json({message:'Fallo al loguearse el usuario'+error})
    }

    }

}
