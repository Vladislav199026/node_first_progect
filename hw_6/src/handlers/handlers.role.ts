import { Request, Response } from 'express';
import { roles } from '../mockData';

export const createRole = (req: Request, res: Response) => {
  const { name, description, permissions } = req.body;

  const role = {
    id: (roles.length + 1).toString(),
    name,
    description,
    permissions
  };

  roles.push(role);

  res.status(201).json({ data: role, error: null });
};

export const getRoles = (_req: Request, res: Response) => {
  res.json({ data: roles, error: null });
};

export const updateRole = (req: Request, res: Response) => {
  const { id } = req.params;

  const roleIndex = roles.findIndex((role) => role.id === id);

  if (roleIndex === -1) {
    return res.status(404).json({ data: null, error: { code: 404, message: 'Role not found' }});
  }

  const { name, description, permissions } = req.body;

  roles[roleIndex] = {
    ...roles[roleIndex],
    name: name ?? roles[roleIndex].name,
    description: description ?? roles[roleIndex].description,
    permissions: permissions ?? roles[roleIndex].permissions
  };

  res.json({ data: roles[roleIndex], error: null });
};

export const deleteRole = (req: Request, res: Response) => {
  const { id } = req.params;

  const roleIndex: number = roles.findIndex((role) => role.id === id);

  if (roleIndex === -1) {
    return res.status(404).json({ data: null, error: { code: 404, message: 'Role not found' }});
  }

  const deletedRole = roles.splice(roleIndex, 1);

  res.json({ data: deletedRole, error: null });
};
