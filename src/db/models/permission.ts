export interface Permission {
  id: number;
  name: string;
  description: string;
}

export enum PermissionEnum {
  ADD_EMPLOYEE = 1,
  READ_EMPLOYEE = 2,
  UPDATE_EMPLOYEE = 3,
  REMOVE_EMPLOYEE = 4,

  CREATE_BOOKING = 5,
  READ_BOOKING = 6,
  UPDATE_BOOKING = 7,
  REMOVE_BOOKING = 8,

  READ_LOCATION = 11,
  UPDATE_LOCATION = 12,

  READ_BOOKING_STATUS = 13,
  UPDATE_BOOKING_STATUS = 14,

  READ_SERVICE = 15,
  UPDATE_SERVICE = 16,

  READ_BOOKING_LOGS = 17,

  READ_PERMISSIONS = 18,

  CREATE_ROLES = 19,
  READ_ROLES = 20,
  UPDATE_ROLES = 21,
}
