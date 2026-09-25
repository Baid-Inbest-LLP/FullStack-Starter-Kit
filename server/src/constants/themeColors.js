// Themes are defined in client/src/constants/themeColors.js; the server only stores the key.
// Unknown keys fall back to the default on the client, so adding a theme needs no server change.
export const THEME_KEY_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

// `pnpm create-project --theme <key>` rewrites this line for new projects.
export const DEFAULT_THEME_COLOR = 'crimson-slate';
