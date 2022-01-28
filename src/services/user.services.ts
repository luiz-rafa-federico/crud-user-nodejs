import { UsersRepositories } from "../repositories/user.repository";
import { getCustomRepository } from "typeorm";

import { UserType } from "../types/user.types";

export class CreateUserService {
  async execute(data: UserType) {
    const { email, name, password } = data;

    const usersRepository = getCustomRepository(UsersRepositories);

    const emailAlreadyExists = await usersRepository.findOne({ email });

    if (emailAlreadyExists) {
      throw new Error("E-mail already registered");
    }

    const user = usersRepository.create({ name, email, password });

    await usersRepository.save(user);

    return user;
  }
}
