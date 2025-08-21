import { validationResult } from 'express-validator';
import { User, ROLES } from '../models/User.js';
import { signToken } from '../utils/tokens.js';

function sendValidationErrors(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
}

export const register = async (req, res) => {
  const v = sendValidationErrors(req, res);
  if (v) return;

  const { name, email, password, role } = req.body;
  if (role && !Object.values(ROLES).includes(role)) return res.status(400).json({ message: 'Invalid role' });

  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ message: 'Email already registered' });

  const user = await User.create({ name, email, password, role: role || ROLES.RENTER, isActive: true });
  const token = signToken(user);

  res.status(201).json({
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
    token,
  });
};
