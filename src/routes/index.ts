import { Router } from 'express';
import RollRouter from './roll';

const router = Router();

router.use('/roll', RollRouter);

export default router;
