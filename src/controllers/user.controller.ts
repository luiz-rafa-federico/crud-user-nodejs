import { Request, Response } from "express";
import { CreateUserService } from "../services/user.services";

export class CreateUserController {
  async handle(req: Request, res: Response) {
    try {
      const data = req.validatedData;

      const createUserService = new CreateUserService();

      const user = await createUserService.execute(data as any);

      const { password: password, ...dataWithoutPassword } = user;

      return res.status(201).json(dataWithoutPassword);
    } catch (e) {
      return res.status(400).json({ message: e });
    }
  }
}
