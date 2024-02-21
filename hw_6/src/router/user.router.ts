import { Router, Request, Response, NextFunction } from 'express';
import { createUser, deleteUser, getUsers, updateUser } from '../handlers/handlers.user';
import { validateUser, validateRequest } from '../validation/validation.user';

const router = Router();

router.use((_req: Request, _res: Response, next: NextFunction) => {
  console.log(`User  specific middleware`);
  next();
});

router.post('/', validateUser, createUser);

router.get('/', getUsers);

router.put('/:id', validateRequest, updateUser);

router.delete('/:id', deleteUser);

export default router;
