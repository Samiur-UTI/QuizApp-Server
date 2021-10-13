import { Response } from 'express';
export const mockResponse = () => {
  let res: Response;
  res['status'] = jest.fn().mockReturnValue(res);
  res['json'] = jest.fn().mockReturnValue(res);
  return res;
};
