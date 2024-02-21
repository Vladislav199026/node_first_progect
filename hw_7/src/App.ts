import express, { Request, Response, NextFunction } from 'express';
import userRouter from './router/user.router';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use('/', userRouter);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: { status: 500, message: err.message }});
});

app.listen(PORT, () => console.log('server started on port ' + PORT));
