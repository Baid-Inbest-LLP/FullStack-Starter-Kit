import { useSelector } from 'react-redux';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconCopy, IconTerminal2 } from '@tabler/icons-react';
import { useIsSuperAdmin } from '../../hooks/useAuth';
import { useUpdateThemeColor } from '../../hooks/useAppSettings';
import { getApiErrorMessage } from '../../lib/queryClient';
import { ORDERED_THEME_KEYS, THEME_PALETTES } from '../../constants/themeColors';

function ThemePreview({ palette, isDark }) {
  const [deep, mid, light] = isDark ? palette.darkBrand : palette.brand;
  const gradient = `linear-gradient(to bottom right, ${deep}, ${mid}, ${light})`;
  return (
    <div className="theme-preview" style={isDark ? undefined : { backgroundColor: palette.surface }}>
      <div className="flex w-12 flex-col gap-1.5 p-2" style={{ background: gradient }}>
        <span className="h-2 rounded bg-white/80" />
        <span className="h-2 rounded bg-white/30" />
        <span className="h-2 rounded bg-white/30" />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-2">
        <div className="h-8 rounded-md" style={{ background: gradient }} />
        <div className="flex gap-1.5">
          <span className="theme-preview-tile" />
          <span className="theme-preview-tile" />
        </div>
        <span
          className="mt-auto flex h-5 w-16 items-center justify-center self-end rounded"
          style={{ backgroundColor: palette.shades[isDark ? 6 : 7] }}
        >
          <span
            className="h-1 w-8 rounded-full"
            style={{ backgroundColor: palette.primaryContrast || '#ffffff' }}
          />
        </span>
      </div>
    </div>
  );
}

export default function ThemeSettingsPage() {
  const { themeColor, theme } = useSelector((state) => state.common);
  const isDark = theme === 'dark';
  const isSuperAdmin = useIsSuperAdmin();
  const updateThemeColor = useUpdateThemeColor();
  const createCommand = `pnpm create-project "My New App" --theme ${themeColor}`;

  const applyTheme = (color) => {
    if (!isSuperAdmin || color === themeColor || updateThemeColor.isPending) return;
    updateThemeColor.mutate(color, {
      onSuccess: () =>
        notifications.show({ message: `${THEME_PALETTES[color].label} theme applied`, color: 'green' }),
      onError: (err) =>
        notifications.show({
          message: getApiErrorMessage(err, 'Failed to update theme'),
          color: 'red',
        }),
    });
  };

  const copyCommand = async () => {
    try {
      await navigator.clipboard.writeText(createCommand);
      notifications.show({ message: 'Command copied', color: 'green' });
    } catch {
      notifications.show({ message: 'Could not copy command', color: 'red' });
    }
  };

  return (
    <div className="space-y-4">
      <div className="card p-5">
        <div className="mb-4">
          <h3 className="theme-section-title">Theme</h3>
          {!isSuperAdmin && (
            <p className="theme-section-desc">
              The theme used across the whole app. Only a superadmin can change it.
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {ORDERED_THEME_KEYS.map((color) => {
            const palette = THEME_PALETTES[color];
            const isActive = color === themeColor;
            const isApplying = updateThemeColor.isPending && updateThemeColor.variables === color;
            return (
              <button
                key={color}
                type="button"
                onClick={() => applyTheme(color)}
                disabled={!isSuperAdmin}
                aria-pressed={isActive}
                className={`theme-option ${isActive ? 'theme-option--active' : ''} ${
                  isSuperAdmin ? 'cursor-pointer' : 'cursor-default'
                }`}
              >
                <ThemePreview palette={palette} isDark={isDark} />
                <div className="mt-3 flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <span className="theme-option-label">{palette.label}</span>
                    <p className="theme-option-desc">{palette.description}</p>
                  </div>
                  {isActive ? (
                    <span className="theme-active-badge">
                      <IconCheck size={12} stroke={3} /> Active
                    </span>
                  ) : (
                    isSuperAdmin && (
                      <span className="theme-option-action">
                        {isApplying ? 'Applying…' : 'Apply'}
                      </span>
                    )
                  )}
                </div>
                <div className="mt-3 flex gap-1.5">
                  {palette.swatches.map((hex, i) => (
                    <span
                      key={`${hex}-${i}`}
                      title={hex}
                      className="theme-swatch"
                      style={{ backgroundColor: hex }}
                    />
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="card p-5">
        <div className="flex items-start gap-3">
          <div className="stat-icon-box theme-command-icon">
            <IconTerminal2 stroke={1.8} />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="theme-section-title">Start a new project with this theme</h3>
            <div className="mt-3 flex items-center gap-2">
              <code className="input-field flex-1 select-all font-mono text-sm">{createCommand}</code>
              <button
                type="button"
                className="btn-secondary shrink-0"
                onClick={copyCommand}
                aria-label="Copy command"
                title="Copy command"
              >
                <IconCopy size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
