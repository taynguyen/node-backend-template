import { uniq } from 'lodash';
import { UserDetail } from '../routes/models/user';
import db from './db';
import { RolePermission } from './models/role_permission';
import { User, UserPermission, UserRole } from './models/user';

export async function getUser({
  id,
  username,
  email,
}: {
  id?: string;
  username?: string;
  email?: string;
}): Promise<UserDetail> {
  const query = db<User>('users');

  id && query.where('id', '=', id);
  username && query.where('username', '=', username);
  email && query.where('email', '=', email);

  const user: UserDetail = await query.first();

  if (user) {
    user.permissions = (
      await db<UserPermission>('user_permissions')
        .where('user_id', '=', user.id)
        .select('permission_id')
    ).map((up) => up.permission_id);

    user.roles = (
      await db<UserRole>('user_roles')
        .where('user_id', '=', user.id)
        .select('role_id')
    ).map((ur) => ur.role_id);

    const rolePermissionIDs = (
      await db<RolePermission>('role_permissions')
        .whereIn('role_id', user.roles)
        .select('permission_id')
    ).map((rp) => rp.permission_id);
    user.permissions = uniq([...user.permissions, ...rolePermissionIDs]);
  }

  return user;
}
