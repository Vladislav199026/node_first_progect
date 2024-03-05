import { Response } from 'express';

export function errorResponse (res: Response, status: number, message: string) {
  return res.status(status).json({ data: null, error: { status, message }});  
}