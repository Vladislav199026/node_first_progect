import { Request, Response } from 'express';
import { users } from '../mockData';

export const createUser = (req: Request, res: Response) => {
  const { firstName, lastName, address, age, phone } = req.body;

  const isAlreadyExist = !!users.find((user) => user.lastName === lastName);

  if (isAlreadyExist) {
    return res.status(404).json({ data: null, error: { code: 404, message: 'User already exist' }});
  }

  const user = {
    id: (users.length + 1).toString(),
    firstName,
    lastName,
    address,
    age,
    phone
  };

  users.push(user);

  res.status(201).json({ data: user, error: null });
};

export const getUsers = (_req: Request, res: Response) => {
  res.json({ data: users, error: null });
};

export const updateUser = (req: Request, res: Response) => {
  const { id } = req.params;

  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ data: null, error: { code: 404, message: 'User not found' }});
  }

  const { firstName, lastName, address, age, phone } = req.body;

  users[userIndex] = {
    ...users[userIndex],
    firstName: firstName ?? users[userIndex].firstName,
    lastName: lastName ?? users[userIndex].lastName,
    address: address ?? users[userIndex].address,
    age: age ?? users[userIndex].age,
    phone: phone ?? users[userIndex].phone
  };

  res.json({ data: users[userIndex], error: null });
};

export const deleteUser = (req: Request, res: Response) => {
  const { id } = req.params;

  const userIndex: number = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ data: null, error: { code: 404, message: 'User not found' }});
  }

  const deletedUser = users.splice(userIndex, 1);

  res.json({ data: deletedUser, error: null });
};
