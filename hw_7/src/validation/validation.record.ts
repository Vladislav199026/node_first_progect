import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export const recordCreateSchema = (_req: Request, _res: Response, next: NextFunction) => {

  const recordValidationSchema = Joi.object({
    line: Joi.number().required(),
    valve: Joi.number(),
    valves: Joi.alternatives()
      .conditional(Joi.ref('valve'), {
        is: Joi.exist(),
        then: Joi.forbidden(),
        otherwise: Joi.array().items(Joi.number()).required()
      }),
    start: Joi.number().integer().min(0).max(1440).required(),
    end: Joi.number().integer().min(0).max(1440).required(),
    type: Joi.string().valid('MM', 'Volume', 'Time').required(),
    amount: Joi.number().positive().required(),
    fertigation: Joi.boolean().required(),
    start_date: Joi.date().required(),
    machine: Joi.number(),
    cycles: Joi.number(),
    interval: Joi.number(),
    field: Joi.any(),
    fert_recipe: Joi.number()
  });

  const validationResult = recordValidationSchema.validate({});

  if (validationResult.error) {
    return next(new Error(validationResult.error.message))
  }

  next();
};