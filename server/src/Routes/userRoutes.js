import express from 'express';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/admin', protect(['admin']), (req, res) => res.json({ message: 'Admin route' }));
router.get('/renter', protect(['renter']), (req, res) => res.json({ message: 'Renter route' }));
router.get('/seller', protect(['seller']), (req, res) => res.json({ message: 'Seller route' }));

export default router;