import { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  // eslint-disable-next-line no-unused-vars
  authenticate: (plainTextPassword: string) => boolean;
  // eslint-disable-next-line no-unused-vars
  encryptPassword: (password: string | undefined) => string;
  createdAt: Date;
  updatedAt: Date;
}
