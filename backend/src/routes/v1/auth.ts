import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

const router = Router();

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128),
  display_name: z.string().min(1).max(100).optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

// POST /api/v1/auth/register
router.post('/register', async (req: Request, res: Response) => {
  try {
    const body = registerSchema.parse(req.body);
    const password_hash = await bcrypt.hash(body.password, 12);

    // TODO: Insert user into database
    // const [user] = await db('users').insert({
    //   email: body.email,
    //   password_hash,
    //   display_name: body.display_name || body.email.split('@')[0],
    // }).returning('*');

    const token = jwt.sign(
      { sub: 'user-id-placeholder', email: body.email },
      process.env.JWT_SECRET || 'dev-secret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.status(201).json({
      success: true,
      data: { token, user: { email: body.email, plan: 'free' } },
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: 'Validation failed', details: err.errors });
    }
    console.error('Register error:', err);
    res.status(500).json({ success: false, error: 'Registration failed' });
  }
});

// POST /api/v1/auth/login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const body = loginSchema.parse(req.body);

    // TODO: Look up user in database
    // const user = await db('users').where({ email: body.email }).first();
    // if (!user || !(await bcrypt.compare(body.password, user.password_hash))) {
    //   return res.status(401).json({ success: false, error: 'Invalid credentials' });
    // }

    const token = jwt.sign(
      { sub: 'user-id-placeholder', email: body.email },
      process.env.JWT_SECRET || 'dev-secret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.json({
      success: true,
      data: { token, user: { email: body.email, plan: 'free' } },
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: 'Validation failed', details: err.errors });
    }
    console.error('Login error:', err);
    res.status(500).json({ success: false, error: 'Login failed' });
  }
});

// GET /api/v1/auth/me
router.get('/me', async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, error: 'Missing authorization token' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret') as { sub: string; email: string };

    // TODO: Fetch user from database
    res.json({
      success: true,
      data: { id: decoded.sub, email: decoded.email, plan: 'free' },
    });
  } catch (err) {
    res.status(401).json({ success: false, error: 'Invalid or expired token' });
  }
});

export default router;
