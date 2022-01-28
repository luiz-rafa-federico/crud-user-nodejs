import * as yup from "yup";
import bcrypt from "bcrypt";

import { UserSchemaType } from "../types/user.types";

export const userSchema: UserSchemaType = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  createdOn: yup
    .date()
    .default(() => {
      return new Date();
    })
    .transform(() => {
      return new Date();
    }),
  updatedOn: yup
    .date()
    .default(() => {
      return new Date();
    })
    .transform(() => {
      return new Date();
    }),
  password: yup
    .string()
    .required()
    .transform((value, originalValue) => {
      return bcrypt.hashSync(originalValue, 10);
    }),
});
