import { Request, Response, NextFunction } from 'express';

export function errorHandler (err: Error, _req: Request, res: Response, _next: NextFunction) {
  if (err) {
    console.error(err.stack);
    res.status(500).json({ error: { status: 500, message: err.message }});  
  }
}
