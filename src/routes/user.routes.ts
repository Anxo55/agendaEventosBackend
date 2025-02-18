import { Router } from "express";
// import { isAuthenticated } from "../middleware/auth.middelware";
import { UserController } from "../controllers/user.controller";
import { isAuthenticated } from "../middleware/auth.middelware";


const router = Router()

router.get('/profile',isAuthenticated, UserController.profile)
router.get('/',isAuthenticated, UserController.getAll) //ruta para todos los usuarios, tenemos que llamar a getAll

export default router