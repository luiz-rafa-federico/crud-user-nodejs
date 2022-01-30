import { UsersRepository } from "../repositories/user.repository";
import { getCustomRepository } from "typeorm";

import { UserSchema } from "../types/user.types";

export class CreateUserService {
  async execute(data: UserSchema) {
    const { email, name, password, isAdm, createdOn, updatedOn } = data;

    const usersRepository = getCustomRepository(UsersRepository);

    const emailAlreadyExists = await usersRepository.findOne({ email });

    if (emailAlreadyExists) {
      throw new Error("E-mail already registered");
    }

    const user = usersRepository.create({
      email,
      name,
      password,
      isAdm,
      createdOn,
      updatedOn,
    });

    await usersRepository.save(user);

    return user;
  }
}
