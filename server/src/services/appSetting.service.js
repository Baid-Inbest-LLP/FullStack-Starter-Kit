import { AppSetting } from '../models/AppSetting.js';
import { DEFAULT_THEME_COLOR } from '../constants/themeColors.js';

const APP_KEY = 'app';

const toPublicSettings = (doc) => ({
  themeColor: doc?.themeColor || DEFAULT_THEME_COLOR,
});

export const getAppSettings = async () =>
  toPublicSettings(await AppSetting.findOne({ key: APP_KEY }).lean());

export const updateAppSettings = async ({ themeColor }, userId) => {
  const doc = await AppSetting.findOneAndUpdate(
    { key: APP_KEY },
    { $set: { themeColor, updatedBy: userId } },
    { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true },
  ).lean();
  return toPublicSettings(doc);
};
