import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './src/config/env.js';
import authRoutes from './src/routes/authRoutes.js';
import protectedRoutes from './src/routes/protectedRoutes.js';
import { notFound, errorHandler } from './src/middleware/errorHandler.js';

const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: false
  })
);

app.get('/', (req, res) => {
  res.json({ status: 'OK', service: 'Vehicle Renting Backend (single JWT)' });
});

app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;