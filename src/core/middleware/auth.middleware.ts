import type { Request, Response, NextFunction } from 'express';

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // TODO
  console.log('JWT verification ');
  next();
};

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // TODO
  console.log('Require auth placeholder');
  next();
};
