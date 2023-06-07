import express, { Application, Request, Response } from "express";
import { load } from 'ts-dotenv';
import cors, { CorsOptions } from "cors";

import { connectDB } from "./config/db";
import router from './routes/todo'

const env = load({
    PORT: Number,
    MONGO_URI: String
})

connectDB(env.MONGO_URI);

const app: Application = express();
const corsOptions: CorsOptions = {
    origin: [`http://localhost:${env.PORT}`],
}

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World YEET with ts-dotenv");
})

app.listen(env.PORT, () => {
    console.log(`Connected on PORT: ${env.PORT}`)
})

app.use('/', router)