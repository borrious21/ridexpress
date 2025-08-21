import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import signupRoutes from './routes/signupRoutes.js';
import loginRoutes from './routes/loginRoutes.js';
import meRoutes from './routes/meRoutes.js';
import protectedRoutes from './routes/protectedRoutes.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';
import { requireAuth } from './middleware/auth.js';

dotenv.config();

const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: false,
  })
);

app.get('/', (req, res) => {
  res.json({ status: 'OK', service: 'Vehicle Renting Backend (single JWT)' });
});

app.use('/api/signup', signupRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/me', meRoutes);

app.use('/api/protected', protectedRoutes); 

app.use(notFound);
app.use(errorHandler);

async function start() {
  try {
    await connectDB();
    app.listen(process.env.PORT, () =>
      console.log(`Server running on http://localhost:${process.env.PORT}`)
    );
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

start();
