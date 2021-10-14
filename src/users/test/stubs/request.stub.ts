import { getMockReq } from '@jest-mock/express';
import { UserInfo } from '../../users.controller';
import { User } from '../../../auth/dto/user.dto';
export const mockRequest = getMockReq({
  user: {
    id: '6167fac1c64930d3f0ac3742',
    email: 'sallu@gmail.com',
  } as UserInfo,
  body: {
    firstName: 'Samiur',
    lastName: 'Khan',
    email: 'sallu@gmail.com',
    password: '1203123xz',
  } as User,
});
