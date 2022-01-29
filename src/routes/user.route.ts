import { Router } from "express";
import { CreateUserController } from "../controllers/user.controller";
import { userSchema } from "../models/user.schema";
import { validate } from "../middlewares/validate.middleware";

const router = Router();

const createUserController = new CreateUserController();

export const userRoute = () => {
  router.post("", validate(userSchema as any), createUserController.handle);
  router.get("");
  router.get("/profile");
  router.patch("/:uuid");
  router.delete("/:uuid");

  return router;
};
