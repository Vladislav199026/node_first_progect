import { Request, Response,  } from 'express';
import { signInService, signUpService } from '../services/user.service';
import { errorResponse } from '../errors/error-response';

export const signUp = async (req: Request, res: Response) => {
  const { success, error } = await signUpService(req);

  if (error) {
    return errorResponse(res, error.code, error.message);
  }

  res.status(201).json({ data: success, error: null });
};

export const signIn = async (req: Request, res: Response) => {
  const { success, error } = await signInService(req);

  if (error) {
    return errorResponse(res, error.code, error.message);
  }

  res.status(200).json({
    data: {
      code: 200,
      message: 'Sign in successfully!',
    },
    success,
    error: null,
  });
};

export const getOwnInfo = (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return errorResponse(res, 404, 'User not found');
    }

    res.status(201).json({ data: req.user, error: null });
  } catch (error) {
    res.status(500).json({ error });
  }
};
