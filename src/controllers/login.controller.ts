import { Request, Response } from "express";
import { LoginService } from "../services/login.service";
import { LoginSchema } from "../types/user.types";

export class AuthenticateUser {
  async handle(req: Request, res: Response) {
    try {
      const userInfo: LoginSchema = req.body;

      const login = new LoginService();

      const token = await login.execute(userInfo);

      res.json({ userToken: token });
    } catch (e) {
      res.status(400).json({ message: e });
    }
  }
}
