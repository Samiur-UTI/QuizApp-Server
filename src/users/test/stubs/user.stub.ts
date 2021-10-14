import { User } from '../../../auth/dto/user.dto';
export const userStub = (): User => {
  return {
    id: '6167fac1c64930d3f0ac3742',
    firstName: 'Salman',
    lastName: 'Khan',
    email: 'sallu@gmail.com',
    password: '$2b$10$8ytdrX0hlRvrLwlGOvb9lOXLYXsHITqPm5e141giDM7JUed4Bxjzm',
  };
};
