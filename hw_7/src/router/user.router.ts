import { Router } from 'express';
import { signUp, signIn } from '../handlers/handlers.user';
import { validateUser } from '../validation/validation.user';
import { ERoutes } from '../enum';

const router = Router();

router.post(ERoutes.SIGN_UP, validateUser, signUp);
router.post(ERoutes.SIGN_IN, signIn);

export default router;
