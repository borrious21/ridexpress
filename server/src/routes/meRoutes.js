import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { me } from '../controller/loginAuthController.js';

const router = Router();

router.get('/me', requireAuth, me);

export default router;
