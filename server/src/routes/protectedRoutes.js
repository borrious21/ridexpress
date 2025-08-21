import { Router } from 'express';
import { requireAuth, requireRoles } from '../middleware/auth.js';

const router = Router();

router.get('/admin/dashboard', requireAuth, requireRoles('admin'), (req, res) => {
  res.json({ message: 'Admin dashboard: manage users, vehicles, reports' });
});

router.get('/renter/bookings', requireAuth, requireRoles('renter'), (req, res) => {
  res.json({ message: 'Renter bookings: your rental history and active bookings' });
});

router.get('/seller/vehicles', requireAuth, requireRoles('seller'), (req, res) => {
  res.json({ message: 'Seller vehicles: manage your listed vehicles' });
});

export default router;