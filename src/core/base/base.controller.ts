import type { Request, Response, NextFunction } from 'express';

export abstract class BaseController {
  /**
   * Simple success response
   */
  protected success<T>(
    res: Response,
    data: T,
    message: string = 'Success',
    statusCode: number = 200,
  ): Response {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }

  /**
   * Simple error response
   */
  protected error(
    res: Response,
    message: string = 'Error',
    statusCode: number = 400,
  ): Response {
    return res.status(statusCode).json({
      success: false,
      message,
    });
  }

  /**
   * Async handler wrapper
   */
  protected asyncHandler(
    fn: (req: Request, res: Response, next: NextFunction) => Promise<any>,
  ) {
    return (req: Request, res: Response, next: NextFunction) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  }
}
