import { Test } from '@nestjs/testing';
import { UserController } from '../users.controller';
import { UserService } from '../users.service';

describe('Userscontroller', () => {
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [UserController],
      providers: [UserService],
      exports: [],
    }).compile();
  });
});
