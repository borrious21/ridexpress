import { Router } from 'express';
import { body } from 'express-validator';
import { login } from '../controller/loginAuthController.js';

const router = Router();

router.post(
  '/',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
  ],
  login
);

export default router;
