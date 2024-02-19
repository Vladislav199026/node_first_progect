import { NextFunction, Request, Response } from 'express';
import path from 'path';
import { Readable } from 'stream';
import multer, { FileFilterCallback } from 'multer';
import { createWriteStream } from 'fs';

const maxSize = 500 * 1024 * 1024;

const upload = multer({
  limits: { fileSize: maxSize },
  fileFilter: (_req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (file.mimetype === "video/mp4") {
      cb(null, true);
    } else {
      cb(new Error("Only mp4 video files are allowed for download"));
    }
  }
}).single('video');

export const handleUpload = (req: Request, res: Response, next: NextFunction) => {
  upload(req, res, (err: any) => {
    if (err) {
      res.status(500).send("Video loading error");
    } else {
      const file = req.file;

      if (!file) {
        res.status(400).json({ status: 400, error: "File not find" });
        return;
      }

      const { buffer, originalname } = file;
      const filename = `${Date.now()}-${originalname}`;
      const filepath = path.join(__dirname, 'uploads', filename);

      const readableStream = new Readable({
        read() {
          this.push(buffer);
          this.push(null);
        }
      });

      const writableStream = createWriteStream(filepath);

      readableStream.pipe(writableStream);

      writableStream.on('finish', () => {
        next();
      });

      writableStream.on('error', (error) => {
        res.status(500).json({ status: 500, error });
      });
    }
  });
};
