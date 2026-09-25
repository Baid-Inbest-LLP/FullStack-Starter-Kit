import api from "./axios";

export const masterApi = {
	users: () => api.get("/masters/users"),
	updateUser: (id, data) => api.put(`/masters/users/${id}`, data),
	deleteUser: (id) => api.delete(`/masters/users/${id}`),
	resetUserPassword: (id) => api.post(`/masters/users/${id}/reset-password`),
};
