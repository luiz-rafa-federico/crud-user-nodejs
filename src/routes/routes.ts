import { userRoute } from "./user.route";
import { userLogin } from "./user.login";
import { Express } from "express";

export const initializeRouter = (app: Express) => {
  app.use("/users", userRoute());
  app.use("/login", userLogin());
};
