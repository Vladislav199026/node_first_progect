export const jwtAccessConfig = 'access-jwt-config';
export const jwtRefreshConfig = 'refresh-jwt-config';

export const accessTokenExp = Math.floor(Date.now() / 1000) + (2 * 60); 
export const refreshTokenExp = Math.floor(Date.now() / 1000) + (5 * 60); 
