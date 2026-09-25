import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { appSettingsApi } from '../api/appSetting.api';
import { queryKeys } from '../lib/queryKeys';
import { setThemeColor } from '../store/slices/commonSlice';

export const useAppSettings = () =>
  useQuery({
    queryKey: queryKeys.appSettings,
    queryFn: async () => (await appSettingsApi.get()).data.data,
    staleTime: 5 * 60 * 1000,
  });

export const useUpdateThemeColor = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: async (themeColor) => (await appSettingsApi.update({ themeColor })).data.data,
    onSuccess: (settings) => {
      queryClient.setQueryData(queryKeys.appSettings, settings);
      dispatch(setThemeColor(settings.themeColor));
    },
  });
};
