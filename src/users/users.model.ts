import * as mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});
export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
