import { Router } from 'express';
import passport from 'passport';
import { signUp, signIn, getOwnInfo } from '../handlers/handlers.user';
import { validateUser } from '../validation/validation.user';
import { EBasePrefix, ERoutes } from '../enum';

const router = Router();

router.post(`${EBasePrefix.BASE_PREFIX}${ERoutes.SIGN_UP}`, validateUser, signUp);
router.post(`${EBasePrefix.BASE_PREFIX}${ERoutes.SIGN_IN}`, signIn);
router.get(`${EBasePrefix.BASE_PREFIX}${ERoutes.ME}`, passport.authenticate('jwt', { session: false }), getOwnInfo);

export default router;
