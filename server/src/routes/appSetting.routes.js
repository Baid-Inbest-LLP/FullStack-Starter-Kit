import { Router } from 'express';
import * as appSettingController from '../controllers/appSetting.controller.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { updateAppSettingsSchema } from '../validators/appSetting.validator.js';

const router = Router();

// Public: the login page is themed before anyone signs in.
router.get('/', appSettingController.getAppSettings);
router.put(
  '/',
  authenticate,
  authorize('superadmin'),
  validate(updateAppSettingsSchema),
  appSettingController.updateAppSettings,
);

export default router;
