import { Request, Response, NextFunction } from "express";
import { IUser } from "../interface";

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers['api-key']) {
    return res.status(400).send('Api key is missing');
  }
  next();
};

export const validateUser = (req: Request, res: Response, next: NextFunction) => {
  const { firstName, lastName, address, age, phone }: IUser = req.body;

  if (!firstName || !lastName || !address || !age || !phone) {
    return res.status(400).json({ data: null, error: { code: 400, message: 'All fields are required' }});
  }

  if (firstName.length < 3 || firstName.length > 15) {
    return res.status(400).json({ data: null, error: { code: 400, message: 'First name must be between 3 and 15 characters long' }});
  }

  next();
};