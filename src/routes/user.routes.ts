import { UserController } from "../controllers/user.controller";
import { isAuthenticate } from "../middleware/auth.middelware";
import { Router } from "express";


const router = Router()

router.get('/profile',isAuthenticate, UserController.profile)
router.get('/',isAuthenticate, UserController.getAll) //ruta para todos los usuarios, tenemos que llamar a getAll

export default router