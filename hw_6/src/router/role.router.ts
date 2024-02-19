import { Router, Request, Response } from 'express';
import { createRole, deleteRole, getRoles, updateRole } from '../handlers/handlers.role';

const router = Router();

router.post('/', createRole);

router.get('/', getRoles);

router.put('/:id', updateRole);

router.delete('/:id', deleteRole);

export default router;
