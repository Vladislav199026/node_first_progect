import express, { Request, Response, NextFunction } from 'express';
import authRouter from './router/auth.router';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use('/', authRouter);

app.use((_req: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({ error: { status: 404, message: 'Route do not exist' }});
});

app.listen(PORT, () => console.log('server started on port ' + PORT));
