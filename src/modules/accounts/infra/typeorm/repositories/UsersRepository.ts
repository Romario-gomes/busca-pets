import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { User } from "../entities/User";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    name,
    username,
    email,
    password,
    roles,
    avatar,
    id,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      username,
      email,
      password,
      roles,
      avatar,
      id,
    });

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id);
    return user;
  }

  async findByIdWithRolesAndPermissions(id: string): Promise<User> {
    const user = await this.repository.findOne(id, {
      relations: ["roles", "roles.permission"],
    });

    return user;
  }

  async findByEmailWithRolesAndPermissions(email: string): Promise<User> {
    const user = await this.repository.findOne(
      { email },
      {
        relations: ["roles", "roles.permission"],
      },
    );

    return user;
  }
}

export { UsersRepository };
