import * as yup from "yup";
import { LoginSchema } from "../types/user.types";

export const loginSchema: yup.SchemaOf<LoginSchema> = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});
