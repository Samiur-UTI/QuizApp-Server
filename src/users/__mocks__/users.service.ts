import { userStub } from '../test/stubs/user.stub';

export const UserService = jest.fn().mockReturnValue({
  fetchUsers: jest.fn().mockResolvedValue([userStub()]),
  fetchUser: jest.fn().mockResolvedValue(userStub()),
  insertUser: jest.fn().mockResolvedValue(userStub().id),
  updateUser: jest.fn().mockResolvedValue(userStub),
  deleteUser: jest.fn().mockResolvedValue(userStub()),
});
