import { Router } from 'express';
import authRoutes from './auth.routes.js';
import masterRoutes from './master.routes.js';
import appSettingRoutes from './appSetting.routes.js';

const router = Router();

router.get('/health', (_req, res) => {
  res.json({
    success: true,
    message: 'FullStack Starter Kit API is running',
    timestamp: new Date().toISOString(),
  });
});

router.use('/auth', authRoutes);
router.use('/masters', masterRoutes);
router.use('/app-settings', appSettingRoutes);

export default router;
