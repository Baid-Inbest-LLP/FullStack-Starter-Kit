import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import * as appSettingService from '../services/appSetting.service.js';

export const getAppSettings = asyncHandler(async (_req, res) => {
  ApiResponse.success(res, await appSettingService.getAppSettings(), 'App settings');
});

export const updateAppSettings = asyncHandler(async (req, res) => {
  const settings = await appSettingService.updateAppSettings(req.body, req.user._id);
  ApiResponse.success(res, settings, 'App settings updated');
});
