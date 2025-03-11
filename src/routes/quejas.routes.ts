import { QuejasController } from "../controllers/quejas.controller";
import { isAuthenticated } from "../middleware/auth.middelware";
import { isAdmin } from "@/middleware/isAdmin.middleware";
import { Router } from "express";


const router = Router()

router.get('/',isAuthenticated, isAdmin, QuejasController.getAll)
router.post('/',isAuthenticated, QuejasController.createQueja)

export default router