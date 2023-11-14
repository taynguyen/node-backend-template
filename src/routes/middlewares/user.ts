import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { PermissionEnum } from '../../db/models/permission';
import { getRqUser } from '../utils/request';

export function havePermissions(permissions: PermissionEnum[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = getRqUser(req);
    if (
      user &&
      user.permissions &&
      user.permissions.some((p) => permissions.includes(p))
    ) {
      next();
    } else {
      res.status(StatusCodes.FORBIDDEN).json({ message: 'Forbidden' });
    }
  };
}

export function loggedIn(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'User not logged in' });
  }
}
