import { UserController } from "../controllers/user.controller";
import { isAuthenticate } from "../middleware/auth.middelware";
import { Router } from "express";


const router = Router()

router.get('/profile',isAuthenticate, UserController.profile)

export default router