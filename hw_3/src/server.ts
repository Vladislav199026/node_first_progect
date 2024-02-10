import express from 'express';
import { saveUser, getUsersList } from './fs';
import { ERoutes } from './routs';

const router = express.Router();

router.post(ERoutes.USERS, async (req, res) => {
  try {
      const { login, password } = req.body;
      const newUser = { login, password };
      await saveUser(newUser);
      res.status(201).send('User successfully added to the database');
  } catch (error) {
      console.error('Error processing the request:', error);
      res.status(500).send('Server error');
  }
});

router.get(ERoutes.USERS, async (_req, res) => {
  try {
      const users = await getUsersList();
      res.status(200).json(users);
  } catch (error) {
      console.error('Error processing the request:', error);
      res.status(500).send('Server error');
  }
});

export default router;
