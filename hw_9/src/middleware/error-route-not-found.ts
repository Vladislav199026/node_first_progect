import { Request, Response, NextFunction } from 'express';

export function errorRouteNotFind (_req: Request, res: Response, _next: NextFunction) {
  res.status(404).json({ error: { status: 404, message: 'Route do not exist' }});
}
