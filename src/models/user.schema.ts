import * as yup from "yup";
import bcrypt from "bcrypt";
import { UserSchema } from "../types/user.types";

export const userSchema: yup.SchemaOf<UserSchema> = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  isAdm: yup.boolean().required(),
  password: yup
    .string()
    .required()
    .transform((value, originalValue) => {
      return bcrypt.hashSync(originalValue, 10);
    }),
  // createdOn: yup
  //   .date()
  //   .default(() => {
  //     return new Date();
  //   })
  //   .transform(() => {
  //     return new Date();
  //   }),
  // updatedOn: yup
  //   .date()
  //   .default(() => {
  //     return new Date();
  //   })
  //   .transform(() => {
  //     return new Date();
  //   }),
});
