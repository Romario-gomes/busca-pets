import { verify } from "jsonwebtoken";
import { injectable, inject } from "tsyringe";

import auth from "@config/auth";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

interface IRequest {
  token: string;
}

interface IPayLoad {
  email: string;
}

@injectable()
class ShowUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ token }: IRequest): Promise<User> {
    const { email } = verify(token, auth.secret_token) as IPayLoad;

    const user = await this.usersRepository.findByEmailWithRolesAndPermissions(
      email,
    );

    return user;
  }
}

export { ShowUserUseCase };
