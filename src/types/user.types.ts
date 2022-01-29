export interface UserType {
  name: string;
  email: string;
  password: string;
}

export interface UserSchema {
  name: string;
  email: string;
  password: string;
  // createdOn: Date;
  // updatedOn: Date;
  isAdm: boolean;
}

export interface UserSchemaValidate extends UserSchema {
  validate: (data: UserType, arg2: ValidateArgs) => Promise<any>;
}

interface ValidateArgs {
  abortEarly: boolean;
  stripUnknown: boolean;
}
