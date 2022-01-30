import { User } from "../entities";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(User)
class UsersRepository extends Repository<User> {}

export { UsersRepository };
