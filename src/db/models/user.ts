export interface User {
  id: string;
  name: string;
  username?: string;
  email: string;
  hashed_password?: string;
}

export interface UserRole {
  id: number;
  user_id: string;
  role_id: number;
}

export interface UserPermission {
  id: number;
  user_id: string;
  permission_id: number;
}
