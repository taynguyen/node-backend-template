import { Request } from 'express';
import { User } from '../../db/models/user';
import { UserDetail } from '../models/user';

export function getRqUser(req: Request): UserDetail {
  return req.user as User;
}
