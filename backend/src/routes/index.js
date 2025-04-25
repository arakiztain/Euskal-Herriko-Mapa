import { Router } from 'express';
import authRoutes from './auth_routes.js';
import municipiosRoutes from './municipios_routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/municipios', municipiosRoutes);

export default router;