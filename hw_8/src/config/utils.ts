import jwt, { JwtPayload } from 'jsonwebtoken';
import { IUser } from '../interface';
import { accessTokenExp, jwtAccessConfig, jwtRefreshConfig, refreshTokenExp } from './jwt-config';

export const signTokens = (user: Omit<IUser, 'password'>): {
  accessToken: string;
  refreshToken: string;
} => {
  const accessToken = jwt.sign({
    exp: accessTokenExp,
    data: {
      username: user.username,
      email: user.email,
      id: user.id,
    },
  }, jwtAccessConfig);

  const refreshToken = jwt.sign({
    exp: refreshTokenExp,
    data: {
      username: user.username,
      email: user.email,
      id: user.id,
    },
  }, jwtRefreshConfig);

  return { accessToken, refreshToken }
}

export const isTokenExpired = (tokenData: JwtPayload): boolean => {
  return tokenData.exp! < Date.now() / 1000;
};

export const jwtVerify = (token: string, config: string): JwtPayload | null => {
  try {
    return jwt.verify(token, config) as JwtPayload;
  } catch (error) {
    return null;
  }
};
