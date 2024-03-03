import { Request, Response } from 'express';
import { users } from '../mockData';
import argon2 from 'argon2';
import { signTokens, isTokenExpired, jwtVerify } from '../config/utils';
import { jwtRefreshConfig } from '../config/jwt-config';

export const signIn = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ data: null, error: { code: 400, message: 'Username and password are required' }});
  }

  const currentUser = users.find((user) => user.username === username);
  const isPasswordValid = await argon2.verify(currentUser?.password ?? '', password);

  if (!currentUser || !isPasswordValid) {
    return res.status(401).json({ data: null, error: { code: 401, message: 'Username or password is incorrect' }});
  }

  const { accessToken, refreshToken } = signTokens(currentUser);

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

export const refreshAccessToken = (req: Request, res: Response) => {
  const { refreshToken: reqRefreshToken } = req.body;

  if (!reqRefreshToken) {
    return res.status(400).json({ error: { code: 400, message: 'Refresh token is required' }});
  }

  const refreshTokenDecode = jwtVerify(reqRefreshToken, jwtRefreshConfig);

  if (!refreshTokenDecode) {
    return res.status(401).json({ error: { code: 401, message: 'Invalid refresh token' }});
  }

  if (isTokenExpired(refreshTokenDecode)) {
    return res.status(401).json({ error: { code: 401, message: 'Refresh token has expired' }});
  }

  const user = refreshTokenDecode.data;

  const { accessToken, refreshToken } = signTokens(user);

  res.status(200).json({
    data: {
      code: 200,
      message: 'Access token has been refresh successfully!',
    },
    success: {
      accessToken,
      refreshToken,
    },
    error: null,
  });
};
