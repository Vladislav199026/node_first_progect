import express, { Request, Response, NextFunction } from 'express';
import userRouter from './router/user.router';
import roleRouter from './router/role.router';
import { ERoutes } from './enum';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use(ERoutes.USER, userRouter);
app.use(ERoutes.ROLE, roleRouter);

app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`${req.method} request to ${req.url}`);
  next();
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => console.log('server started on port ' + PORT));
