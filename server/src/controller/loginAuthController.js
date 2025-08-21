import { validationResult } from 'express-validator';
import { User } from '../models/User.js';
import { signToken } from '../utils/tokens.js';

function sendValidationErrors(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
}

export const login = async (req, res) => {
  const v = sendValidationErrors(req, res);
  if (v) return;

  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  if (!user.isActive) return res.status(403).json({ message: 'Account disabled' });

  const ok = await user.comparePassword(password);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

  const token = signToken(user);
  res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, token });
};

export const me = async (req, res) => {
  const user = await User.findById(req.user.sub).select('-password');
  res.json({ user });
};
