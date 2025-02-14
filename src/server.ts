import app from './app'
import {ErrorMiddleware} from 'middleware/error.middleware'
const PORT = process.env.PORT || 3000
app.use(ErrorMiddleware)
app.listen(PORT, () => {
    console.log(`Servidor de eventos arrancando en el puerto ${PORT}`)
})