export const ROLES = {
  SUPERADMIN: 'superadmin',
  L1: 'l1',
  L2: 'l2',
  L3: 'l3',
  L4: 'l4',
  L5: 'l5',
  L6: 'l6',
};

// Roles a superadmin can assign in Settings; label is the badge, description the dropdown text.
export const LEVEL_ROLE_OPTIONS = [1, 2, 3, 4, 5, 6].map((n) => ({
  value: `l${n}`,
  label: `L${n}`,
  description: `L${n} - Level ${n}`,
}));
export const DEFAULT_LEVEL_ROLE = ROLES.L1;

export const isSuperAdmin = (role) => role === ROLES.SUPERADMIN;
export const isLevelRole = (role) => LEVEL_ROLE_OPTIONS.some((option) => option.value === role);

export const roleLabel = (role) => {
  if (isSuperAdmin(role)) return 'Superadmin';
  return LEVEL_ROLE_OPTIONS.find((option) => option.value === role)?.label || role || '';
};
