import { Request } from 'express';
import * as argon2 from "argon2";
import { signTokens } from '../utils/jwt-utils';
import UserModel from '../models/user.model';

export const signUpService = async (req: Request) => {
  const { username, password, email } = req.body;

  if (!username || !password) {
    return { success: null, error: { code: 400, message: 'Username and password are required' }};
  }

  const isAlreadyExist = await UserModel.findOne({ username });

  if (isAlreadyExist) {
    return { success: false, error: { code: 400, message: 'User already exists' }};
  }

  const hashedPassword = await argon2.hash(password);

  const userData = {
    username,
    password: hashedPassword,
    email: email ?? null,
  };

  await UserModel.create(userData);

  return { success: { code: 201, message: 'User created successfully!' }, error: null };
};

export const signInService = async (req: Request) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return { success: null, error: { code: 400, message: 'Username and password are required' }};
  }

  const currentUser = await UserModel.findOne({ username });

  if (!currentUser) {
    return { success: null, error: { code: 401, message: 'User not found' }};
  }

  const isPasswordValid = await argon2.verify(currentUser.password as string, password);

  if (!isPasswordValid) {
    return { success: null, error: { code: 401, message: 'Username or password is incorrect' }};
  }

  const tokens = await signTokens(currentUser.id);

  if (!tokens) {
    return { success: null, error: { code: 500, message: 'Failed to generate tokens' }};
  }

  return { success: tokens, error: null };
};
