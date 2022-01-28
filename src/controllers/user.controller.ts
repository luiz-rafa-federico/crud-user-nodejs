import { Request, Response } from "express";
import { CreateUserService } from "../services/user.services";

export class CreateUserController {
  async handle(req: Request, res: Response) {
    try {
      const data = req.body;

      const createUserService = new CreateUserService();

      const user = createUserService.execute(data);

      return res.status(201).json(user);
    } catch (e) {
      return res.status(400).json({ message: e });
    }
  }
}
