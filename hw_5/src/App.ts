import express, { Request, Response } from 'express';
import { ERoutes } from './enum';
import { handleUpload } from './handler/handler.upload';

const PORT = process.env.PORT || 3000;

const app = express();

app.post(ERoutes.UPLOAD, handleUpload, (_req: Request, res: Response) => {
  res.status(200).send("Video has been successfully uploaded!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
