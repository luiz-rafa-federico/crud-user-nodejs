import { Request, Response } from "express";
import {
  CreateUserService,
  ListUsersService,
  UserDataService,
  DeleteUserService,
} from "../services/user.service";

export class CreateUserController {
  async handle(req: Request, res: Response) {
    try {
      const data = req.validatedData;

      const createUserService = new CreateUserService();

      const user = await createUserService.execute(data as any);

      const { password: password, ...dataWithoutPassword } = user;

      res.status(201).json(dataWithoutPassword);
    } catch (e) {
      res.status(400).json({ message: e });
    }
  }
}

export class ListUsersController {
  async handle(req: Request, res: Response) {
    try {
      const listUserService = new ListUsersService();

      const allUsers = await listUserService.execute();

      res.json(allUsers);
    } catch (e) {
      res.status(400).json({ message: e });
    }
  }
}

export class UserDataController {
  async handle(req: Request, res: Response) {
    try {
      const uuid = req.userId;

      const userDataService = new UserDataService();

      const userData = await userDataService.execute(uuid as string);

      res.json(userData);
    } catch (e) {
      res.status(400).json({ message: e });
    }
  }
}

export class DeleteUserController {
  async handle(req: Request, res: Response) {
    try {
      const { uuid } = req.params;

      const deleteUserService = new DeleteUserService();

      await deleteUserService.execute(uuid);

      res.json({ message: "User deleted with success" });
    } catch (e) {
      res.status(400).json({ message: e });
    }
  }
}
