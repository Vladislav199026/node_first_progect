import { Router } from 'express';
import passport from 'passport';
import { signUp, signIn, getOwnInfo } from '../controllers/user.controller';
import { validateUser } from '../validation/user.validation';
import { EBasePrefix, ERoutes } from '../enum';

const router = Router();

router.post(`${EBasePrefix.BASE_PREFIX}${ERoutes.SIGN_UP}`, validateUser, signUp);
router.post(`${EBasePrefix.BASE_PREFIX}${ERoutes.SIGN_IN}`, signIn);
router.get(`${EBasePrefix.BASE_PREFIX}${ERoutes.ME}`, passport.authenticate('jwt', { session: false }), getOwnInfo);

export default router;
