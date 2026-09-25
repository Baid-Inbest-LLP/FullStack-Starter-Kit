import { useEffect, useLayoutEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { buildMantineTheme } from '../../theme';
import { applyThemeColor } from '../../constants/themeColors';
import { useAppSettings } from '../../hooks/useAppSettings';
import { setThemeColor } from '../../store/slices/commonSlice';
import ThemeProvider from './ThemeProvider';

/** Applies the app-wide theme color (from the server) to CSS variables and Mantine. */
export default function AppThemeProvider({ children }) {
  const dispatch = useDispatch();
  const { theme, themeColor } = useSelector((state) => state.common);
  const { data: settings } = useAppSettings();

  useEffect(() => {
    if (settings?.themeColor && settings.themeColor !== themeColor) {
      dispatch(setThemeColor(settings.themeColor));
    }
  }, [settings?.themeColor, themeColor, dispatch]);

  useLayoutEffect(() => {
    applyThemeColor(themeColor);
  }, [themeColor]);

  const mantineTheme = useMemo(() => buildMantineTheme(themeColor), [themeColor]);

  return (
    <MantineProvider theme={mantineTheme} defaultColorScheme={theme}>
      <ThemeProvider>
        <Notifications position="top-right" />
        {children}
      </ThemeProvider>
    </MantineProvider>
  );
}
