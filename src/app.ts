import express, {Response, Request} from "express"
import authRouter from './routes/auth.routes'
import userRouter from './routes/user.routes'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import helmet from "helmet"
import compression from "compression"
import cookieParser from "cookie-parser"

const app = express()
app.use(express.json())

app.use(helmet())
app.use(compression())
app.use(cookieParser())

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
})

app.use(limiter)

app.use(cors())
app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)


app.get('/', (req:Request, res:Response)=> {
    res.send("Bienvenido al backend (api rest) eventos")
})

export default app


