import { JsonWebTokenError, TokenExpiredError, verify } from "jsonwebtoken";
import { injectable, inject } from "tsyringe";

import auth from "@config/auth";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

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
    try {
      const { email } = verify(token, auth.secret_token) as IPayLoad;

      const user =
        await this.usersRepository.findByEmailWithRolesAndPermissions(email);

      return user;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new AppError("token.expired", 401);
      } else if (error instanceof JsonWebTokenError) {
        throw new AppError("Invalid JWT token", 401);
      } else {
        throw new AppError("Unexpected error", 500);
      }
    }
  }
}

export { ShowUserUseCase };
