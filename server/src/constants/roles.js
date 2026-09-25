export const ROLES = {
  SUPERADMIN: 'superadmin',
  L1: 'l1',
  L2: 'l2',
  L3: 'l3',
  L4: 'l4',
  L5: 'l5',
  L6: 'l6',
};

// Roles a superadmin can assign; everyone except the superadmin has one of these.
export const LEVEL_ROLES = [ROLES.L1, ROLES.L2, ROLES.L3, ROLES.L4, ROLES.L5, ROLES.L6];
export const DEFAULT_LEVEL_ROLE = ROLES.L1;

export const USER_ROLES = Object.values(ROLES);

export const isSuperAdmin = (role) => role === ROLES.SUPERADMIN;
export const isLevelRole = (role) => LEVEL_ROLES.includes(role);
