export interface UserType {
  name: string;
  email: string;
  password: string;
}

export interface UserSchemaType {
  name: string;
  email: string;
  password: string;
  createdOn: Date;
  updatedOn: Date;
}

export interface UserSchemaValidate extends UserSchemaType {
  validate: (data: UserType, arg1: ValidateArgs) => void;
}

interface ValidateArgs {
  abortEarly: boolean;
  stripUnknown: boolean;
}
