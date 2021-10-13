import { Request } from 'express';
export const mockRequest = () => {
  let req: Request;
  req['user'] = jest.fn().mockReturnValue(req);
  return req;
};
