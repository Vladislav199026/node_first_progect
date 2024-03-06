import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export const validateUser = (req: Request, _res: Response, next: NextFunction) => {

  const userValidationSchema = Joi.object({
    username: Joi.string().min(3).max(10).required(),
    password: Joi.string()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{5,15}$')),
    email: Joi.string().email()
  }).required();

  const validationResult = userValidationSchema.validate(req.body);

  if (validationResult.error) {
    return next(new Error(validationResult.error.message))
  }

  next();
};