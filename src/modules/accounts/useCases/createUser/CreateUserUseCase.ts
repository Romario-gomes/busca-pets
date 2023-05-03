import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { IRolesRepository } from "@modules/accounts/repositories/IRolesRepository";

import { AppError } from "../../../../shared/errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("RolesRepository")
    private rolesRepository: IRolesRepository,
  ) {}

  async execute({
    name,
    username,
    email,
    roles,
    password,
  }: ICreateUserDTO): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);
    if (userAlreadyExists) {
      throw new AppError("User already Exists");
    }

    const roleAlreadyExits = await this.rolesRepository.findById(roles);
    if (roleAlreadyExits) {
      throw new AppError("Roles already Exists");
    }

    const passwordHash = await hash(password, 8);

    await this.usersRepository.create({
      name,
      username,
      email,
      roles,
      password: passwordHash,
    });
  }
}

export { CreateUserUseCase };
