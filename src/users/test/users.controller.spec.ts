import { Test } from '@nestjs/testing';
import { User } from 'src/auth/dto/user.dto';
import { UserController } from '../users.controller';
import { UserService } from '../users.service';
import { mockResponse } from './stubs/response.stub';
import { userStub } from './stubs/user.stub';
import { mockRequest } from './stubs/request.stub';
jest.mock('../../users/service');

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
  describe('getUser', () => {
    describe('when profile is called', () => {
      beforeEach(async () => {
        await usersController.fetchUser(mockRequest(), mockResponse());
      });
    });
  });
});
