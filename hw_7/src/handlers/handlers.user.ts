import { Request, Response } from 'express';
import { users } from '../mockData';
import * as argon2 from "argon2";

export const signUp = async (req: Request, res: Response) => {
  const { username = '', password = '', email } = req.body;

  const isAlreadyExist = !!users.find((user) => user.username === username);

  if (isAlreadyExist) {
    return res.status(400).json({ data: null, error: { code: 400, message: 'User already exist' }});
  }

  const hashedPassword = await argon2.hash(password);

  const user = {
    id: (users.length + 1).toString(),
    username,
    password: hashedPassword,
    email: email ?? null,
  };

  users.push(user);

  res.status(201).json({ data: { code: 201, message: 'User created successfully!'}, error: null });
};

export const signIn = async (req: Request, res: Response) => {
  const { username = '', password = '' } = req.body;

  if (!username || !password) {
    return res.status(400).json({ data: null, error: { code: 400, message: 'Username and password are required' }});
  }

  const isExist = users.find((user) => user.username === username);
  const isPasswordValid = await argon2.verify(isExist?.password ?? '', password);

  if (!isExist || !isPasswordValid) {
    return res.status(401).json({ data: null, error: { code: 401, message: 'Username or password is incorrect' }});
  }

  res.status(200).json({ data: { code: 200, message: 'Sign in successfully!'}, error: null });
};
