import { Router } from "express";
import { validate } from "../middlewares/validate.middleware";
import { loginSchema } from "../models/login.schema";
import { AuthenticateUser } from "../controllers/login.controller";

const router = Router();

const authenticateUser = new AuthenticateUser();

export const userLogin = () => {
  router.post("", validate(loginSchema), authenticateUser.handle);

  return router;
};
