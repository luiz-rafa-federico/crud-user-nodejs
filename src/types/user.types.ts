import { JwtPayload } from "jsonwebtoken";

export interface UserSchema {
  name: string;
  email: string;
  password: string;
  isAdm: boolean;
  uuid?: string;
  createdOn?: Date;
  updatedOn?: Date;
}

export interface LoginSchema {
  email: string;
  password: string;
}
