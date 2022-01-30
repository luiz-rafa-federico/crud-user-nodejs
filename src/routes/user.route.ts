import { Router } from "express";
import {
  CreateUserController,
  ListUsersController,
  UserDataController,
} from "../controllers/user.controller";
import { userSchema } from "../models/user.schema";
import { validate } from "../middlewares/validate.middleware";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { isAdm } from "../middlewares/isAdmin.middleware";

const router = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const userDataController = new UserDataController();

export const userRoute = () => {
  router.post("", validate(userSchema), createUserController.handle);
  router.get("", isAuthenticated, isAdm, listUsersController.handle);
  router.get("/profile", isAuthenticated, userDataController.handle);
  router.patch("/:uuid");
  router.delete("/:uuid");

  return router;
};
