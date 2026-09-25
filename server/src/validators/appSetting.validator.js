import { z } from 'zod';
import { THEME_KEY_PATTERN } from '../constants/themeColors.js';

export const updateAppSettingsSchema = z.object({
  themeColor: z
    .string()
    .trim()
    .max(40, 'Theme key is too long')
    .regex(THEME_KEY_PATTERN, 'Theme key must be a lowercase slug, e.g. "ocean" or "crimson-slate"'),
});
