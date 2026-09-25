import { z } from 'zod';
import { USER_ROLES } from '../constants/roles.js';

export const loginSchema = z.object({
  userName: z.string().trim().min(1, 'User name is required').toLowerCase(),
  password: z.string().min(1, 'Password is required'),
});

export const registerSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  userName: z.string().trim().min(1, 'User name is required').toLowerCase(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(USER_ROLES).optional(),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required'),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(6, 'New password must be at least 6 characters'),
});
