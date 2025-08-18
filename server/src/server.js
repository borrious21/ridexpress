import { env } from '../server/src/config/env.js';
import { connectDB } from '../server/src/config/db.js';
import app from './app.js';

async function start() {
  try {
    await connectDB();
    app.listen(env.PORT, () => {
      console.log(`Server running on http://localhost:${env.PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

start();