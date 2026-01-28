import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { BaseController } from '../../core/base/base.controller.js';
import { User } from '../users/user.model.js';

export class AuthController extends BaseController {
  /**
   * Register new user
   */
  register = this.asyncHandler(async (req: Request, res: Response) => {
    const { email, password, name } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return this.error(res, 'User already exists', 400);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      email,
      password: hashedPassword,
      name,
    });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' },
    );

    // Password is auto-removed by toJSON transform
    const userResponse = user.toJSON();

    return this.success(
      res,
      { user: userResponse, token },
      'Registration successful',
      201,
    );
  });

  /**
   * User login
   */
  login = this.asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Find user with password explicitly selected
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return this.error(res, 'Invalid credentials', 401);
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return this.error(res, 'Invalid credentials', 401);
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' },
    );

    // Password is auto-removed by toJSON transform
    const userResponse = user.toJSON();

    return this.success(res, { user: userResponse, token }, 'Login successful');
  });

  /**
   * Get current user profile
   */
  getProfile = this.asyncHandler(async (req: Request, res: Response) => {
    return this.success(
      res,
      {
        message: 'Authentication middleware will be implemented ',
        instruction: 'Send JWT token in Authorization header',
      },
      'Profile endpoint placeholder',
    );
  });

  /**
   * Logout
   */
  logout = this.asyncHandler(async (req: Request, res: Response) => {
    // will be implemented
    return this.success(
      res,
      null,
      'Logged out successfully (client should delete token)',
    );
  });
}
