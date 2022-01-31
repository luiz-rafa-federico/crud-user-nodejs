import { Router } from "express";
import {
  CreateUserController,
  ListUsersController,
  UserDataController,
  DeleteUserController,
} from "../controllers/user.controller";
import { userSchema } from "../models/user.schema";
import { validate } from "../middlewares/validate.middleware";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { isAdm } from "../middlewares/isAdmin.middleware";
import { isUser } from "../middlewares/isUser.middleware";

const router = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const userDataController = new UserDataController();
const deleteUserController = new DeleteUserController();

export const userRoute = () => {
  router.post("", validate(userSchema), createUserController.handle);
  router.get("", isAuthenticated, isAdm, listUsersController.handle);
  router.get("/profile", isAuthenticated, userDataController.handle);
  router.delete("/:uuid", isAuthenticated, isUser, deleteUserController.handle);
  router.patch("/:uuid");

  return router;
};
