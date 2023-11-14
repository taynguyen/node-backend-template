import { PermissionEnum } from '../../db/models/permission';
import { RoleEnum } from '../../db/models/role';
import { User } from '../../db/models/user';

export interface UserDetail extends User {
  // Relations
  roles?: RoleEnum[];
  permissions?: PermissionEnum[];
}
