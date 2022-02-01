import { Router } from "express";
import {
  CreateUserController,
  ListUsersController,
  UserDataController,
  DeleteUserController,
  UpdateUserController,
} from "../controllers/user.controller";
import { userSchema } from "../schemas/user.schema";
import { validate } from "../middlewares/validate.middleware";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { isAdm } from "../middlewares/isAdmin.middleware";
import { isUser } from "../middlewares/isUser.middleware";

const router = Router({ mergeParams: true });

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const userDataController = new UserDataController();
const deleteUserController = new DeleteUserController();
const updateUserController = new UpdateUserController();

export const userRoute = () => {
  router.post("", validate(userSchema), createUserController.handle);
  router.get("", isAuthenticated, isAdm, listUsersController.handle);
  router.get("/profile", isAuthenticated, userDataController.handle);
  router.delete(
    "/:uuid",
    isAuthenticated,
    isUser,
    isAdm,
    deleteUserController.handle
  );
  router.patch(
    "/:uuid",
    isAuthenticated,
    isUser,
    isAdm,
    updateUserController.handle
  );

  return router;
};
