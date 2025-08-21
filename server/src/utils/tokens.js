import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); 

export function signToken(user) {
  return jwt.sign(
    { sub: user._id, role: user.role, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES }
  );
}

export function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}
