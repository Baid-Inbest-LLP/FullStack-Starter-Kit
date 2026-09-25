import api from './axios';

export const appSettingsApi = {
  get: () => api.get('/app-settings'),
  update: (data) => api.put('/app-settings', data),
};
