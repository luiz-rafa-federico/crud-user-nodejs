import { UsersRepository } from "../repositories/user.repository";
import { getCustomRepository } from "typeorm";
import { UserSchema } from "../types/user.types";
import { ErrorHandler } from "../utils/error";

export class CreateUserService {
  async execute(data: UserSchema) {
    const { email, name, password, isAdm, createdOn, updatedOn } = data;

    const usersRepository = getCustomRepository(UsersRepository);

    const emailAlreadyExists = await usersRepository.findOne({ email });

    if (emailAlreadyExists) {
      throw new ErrorHandler(400, "E-mail already registered");
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

export class ListUsersService {
  async execute() {
    const usersRepository = getCustomRepository(UsersRepository);

    const users = (await usersRepository.find()) as UserSchema[];

    return users;
  }
}

export class UserDataService {
  async execute(id: string) {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = (await usersRepository.findOne(id)) as UserSchema;

    return user;
  }
}

export class DeleteUserService {
  async execute(id: string) {
    const usersRepository = getCustomRepository(UsersRepository);

    await usersRepository.delete(id);

    return true;
  }
}

export class UpdateUserService {
  async execute(id: string, data: any) {
    if (data.hasOwnProperty("isAdm")) {
      throw new ErrorHandler(400, "Forbidden to alter admin permissions");
    }

    const usersRepository = getCustomRepository(UsersRepository);

    const normalizeData = { updatedOn: Date(), ...data };

    await usersRepository.update(id, normalizeData);

    const userUpdated = (await usersRepository.findOne(id)) as UserSchema;

    return userUpdated;
  }
}
