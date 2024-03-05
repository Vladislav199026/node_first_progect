import { Request, Response,  } from 'express';
import * as argon2 from "argon2";
import { errorResponse } from '../errors/errorResponse';
import { signTokens } from '../config/jwtConfig/utils';
import UserModel from '../models/userModel';

export const signUp = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;

  const isAlreadyExist = await UserModel.findOne({ username });

  if (isAlreadyExist) {
    return errorResponse(res, 400, 'User already exist');
  }

  const hashedPassword = await argon2.hash(password);

  const userData = {
    username,
    password: hashedPassword,
    email: email ?? null,
  };

  await UserModel.create(userData)

  res.status(201).json({ data: { code: 201, message: 'User created successfully!'}, error: null });
};

export const signIn = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return errorResponse(res, 400, 'Username and password are required');
  }

  const currentUser = await UserModel.findOne({ username });

  const isPasswordValid = await argon2.verify(currentUser?.password!, password);

  if (!currentUser || !isPasswordValid) {
    return errorResponse(res, 401, 'Username or password is incorrect');
  }

  const tokens = await signTokens(currentUser.id);

  if (!tokens) {
    return errorResponse(res, 500, 'Failed to generate tokens');
  }

  const { accessToken, refreshToken } = tokens;

  res.status(200).json({
    data: {
      code: 200,
      message: 'Sign in successfully!',
    },
    success: {
      accessToken,
      refreshToken,
    },
    error: null,
  });
};

export const getOwnInfo = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return errorResponse(res, 404, 'User not found');
    }

    res.status(201).json({ data: req.user, error: null });
  } catch (error) {
    res.status(500).json({ error });
  }
};
