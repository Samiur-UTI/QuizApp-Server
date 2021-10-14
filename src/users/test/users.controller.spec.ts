import { Test } from '@nestjs/testing';
import { User } from 'src/auth/dto/user.dto';
import { UserController, UserInfo } from '../users.controller';
import { UserService } from '../users.service';
import { mockResponse } from './stubs/response.stub';
import { userStub } from './stubs/user.stub';
import { mockRequest } from './stubs/request.stub';
import { ErrorDto } from 'src/auth/dto/error.dto';
jest.mock('../users.service');

describe('Userscontroller', () => {
  let usersController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [UserController],
      providers: [UserService],
      exports: [],
    }).compile();
    usersController = moduleRef.get<UserController>(UserController);
    userService = moduleRef.get<UserService>(UserService);
    jest.clearAllMocks();
  });
  describe('getUsers', () => {
    it('should fetch all users', async () => {
      let users: User[] | ErrorDto;
      // eslint-disable-next-line prefer-const
      users = await usersController.fetchAll();
      expect(users).toHaveLength(1);
      expect(users).toBeInstanceOf(Array);
    });
  });

  describe('get user profile', () => {
    const { id } = mockRequest();
    let user: User | ErrorDto;
    it('should get the userId from the jwt token', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      expect(id).toBeDefined();
      expect(typeof id).toBe('string');
    });
    it('then would fetch user profile with the reference id', async () => {
      user = await usersController.fetchUser(mockRequest())
      expect(userService.fetchUser).toBeCalledWith(userStub().id);
    });
  });
});
