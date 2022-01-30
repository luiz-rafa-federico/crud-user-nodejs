export interface UserSchema {
  name: string;
  email: string;
  password: string;
  isAdm: boolean;
  createdOn?: Date;
  updatedOn?: Date;
}

export interface LoginSchema {
  email: string;
  password: string;
}
