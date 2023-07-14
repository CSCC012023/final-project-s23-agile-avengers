import cors from 'cors';
import express, { Application } from 'express';
import { load } from 'ts-dotenv';

import { connectDB } from './config/db';
import router from './routes/router';

const { PORT } = load({ PORT: Number });

const app: Application = express();

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  connectDB();
  console.info(`Connected on PORT: ${PORT}`);
});

app.use('/', router);
