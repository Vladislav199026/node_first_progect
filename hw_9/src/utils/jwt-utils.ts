import jwt, { JwtPayload } from 'jsonwebtoken';
import { accessTokenExp, jwtAccessConfig, jwtRefreshConfig, refreshTokenExp } from '../config/jwt-config';
import UserModel from '../models/user.model';

export const signTokens = async (userId: string): Promise<{
  accessToken: string;
  refreshToken: string;
} | null> => {

  const user = await UserModel.findById(userId);

  if (!user) {
    return null;
  }

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