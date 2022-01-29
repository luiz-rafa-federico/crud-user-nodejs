import { UserSchema } from "../../types/user.types";
import { SchemaOf } from "yup";

declare global {
  namespace Express {
    interface Request {
      validatedData?: SchemaOf<UserSchema>;
    }
  }
}
