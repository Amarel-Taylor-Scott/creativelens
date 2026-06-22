import { describe, it, expect } from '@jest/globals';
import { registerSchema, loginSchema } from './auth';

describe('registerSchema', () => {
  it('accepts a valid registration (with optional display_name)', () => {
    const result = registerSchema.safeParse({
      email: 'creator@example.com',
      password: 'supersecret',
      display_name: 'Al',
    });
    expect(result.success).toBe(true);
  });

  it('accepts a registration without the optional display_name', () => {
    const result = registerSchema.safeParse({
      email: 'creator@example.com',
      password: 'supersecret',
    });
    expect(result.success).toBe(true);
  });

  it('rejects an invalid email', () => {
    const result = registerSchema.safeParse({
      email: 'not-an-email',
      password: 'supersecret',
    });
    expect(result.success).toBe(false);
  });

  it('rejects a password shorter than 8 characters', () => {
    const result = registerSchema.safeParse({
      email: 'creator@example.com',
      password: 'short',
    });
    expect(result.success).toBe(false);
  });
});

describe('loginSchema', () => {
  it('accepts a valid login', () => {
    const result = loginSchema.safeParse({ email: 'creator@example.com', password: 'x' });
    expect(result.success).toBe(true);
  });

  it('rejects a login with a missing password', () => {
    const result = loginSchema.safeParse({ email: 'creator@example.com' });
    expect(result.success).toBe(false);
  });

  it('rejects a login with an invalid email', () => {
    const result = loginSchema.safeParse({ email: 'nope', password: 'x' });
    expect(result.success).toBe(false);
  });
});
