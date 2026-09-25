// Central registry of React Query keys so invalidations stay consistent.
export const queryKeys = {
	me: ["auth", "me"],
	users: ["masters", "users"],
	appSettings: ["appSettings"],
};
