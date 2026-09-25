import { User } from '../models/User.js';
import { DEFAULT_LEVEL_ROLE } from '../constants/roles.js';

const DEFAULT_SUPERADMIN = {
  name: 'Super Admin',
  userName: (process.env.SUPERADMIN_USERNAME || 'superadmin').trim().toLowerCase(),
  password: process.env.SUPERADMIN_PASSWORD || 'super123',
  role: 'superadmin',
};

/** Moves users from the old single "accountant" role to level L1. */
export const migrateLegacyRoles = async () => {
  const { modifiedCount } = await User.updateMany(
    { role: 'accountant' },
    { $set: { role: DEFAULT_LEVEL_ROLE } },
    { strict: false },
  );
  if (modifiedCount) console.log(`Moved ${modifiedCount} accountant user(s) to ${DEFAULT_LEVEL_ROLE}`);
};

/** Creates the superadmin login when no superadmin exists yet. */
export const ensureSuperAdminAccount = async () => {
  if (await User.exists({ role: 'superadmin' })) return;

  const byUserName = await User.findOne({ userName: DEFAULT_SUPERADMIN.userName });
  if (byUserName) {
    byUserName.role = 'superadmin';
    await byUserName.save({ validateBeforeSave: false });
    console.log(`Upgraded ${DEFAULT_SUPERADMIN.userName} to superadmin`);
    return;
  }

  await User.create(DEFAULT_SUPERADMIN);
  console.log(
    `Created superadmin: ${DEFAULT_SUPERADMIN.userName} / ${DEFAULT_SUPERADMIN.password}`,
  );
};
