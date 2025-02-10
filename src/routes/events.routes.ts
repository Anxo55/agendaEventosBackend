import { EventsController } from "../controllers/events.controller";
import { Router } from "express";


const router = Router()

// Listar todos los eventos de la base de datos
router.get('/', EventsController.getAll)
router.get('/:id', EventsController.getById)

export default router