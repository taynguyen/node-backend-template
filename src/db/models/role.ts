interface Role {
  id: number;
  name: string;
  description: string;
}

export enum RoleEnum {
  ADMIN = 1,
  SHOP_OWNER = 2,
  EMPLOYEE = 3,
}
