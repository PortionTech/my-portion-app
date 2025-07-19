import express from 'express'
import cors from 'cors'
import path from 'path'
import { PORT } from './config/server'
import { APPROUTER } from './routes'
import { databaseErrorHandler, globalErrorHandler, notFoundErrorHandler } from './middleware/errorhandling'

const app = express()

app.use(express.urlencoded( { extended: true, }))
app.use(express.json())
app.use("/uploads", express.static(path.join(__dirname,'uploads')));

app.use('/v1/', APPROUTER)

app.use(cors(
    { 
        origin: '*', 
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        allowedHeaders: "Content-Type,Authorization",
        credentials: true
    }
));



app.use(notFoundErrorHandler)
app.use(databaseErrorHandler)
app.use(globalErrorHandler)

app.listen(PORT, ()=>{
    console.info(`server started! ${PORT}`)
})