import { Router } from 'express';
import { ERoutes } from '../enum';
import { handleUpload } from '../handler/handler.upload';

const router = Router();

router.post(ERoutes.UPLOAD, handleUpload);

export default router;
