import { Router } from 'express';
import { signIn, refreshAccessToken } from '../handlers/handlers.user';
import { EBasePrefix, ERoutes } from '../enum';

const authRouter = Router();

authRouter.post(`${EBasePrefix.BASE_PREFIX}${ERoutes.SIGN_IN}`, signIn);
authRouter.post(`${EBasePrefix.BASE_PREFIX}${ERoutes.REFRESH}`, refreshAccessToken);

export default authRouter;
