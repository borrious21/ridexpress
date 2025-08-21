import { Router } from 'express';
import { body } from 'express-validator';
import { register } from '../controller/signupAuthController.js';

const router = Router();

router.post(
  '/',
  [
    body('name').isString().isLength({ min: 2 }).trim(),
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
    body('role').optional().isIn(['admin', 'renter', 'seller']),
  ],
  register
);

export default router;
