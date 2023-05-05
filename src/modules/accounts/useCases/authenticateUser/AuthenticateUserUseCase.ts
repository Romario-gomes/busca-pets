import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import Permission from "@modules/accounts/infra/typeorm/entities/Permission";
import Role from "@modules/accounts/infra/typeorm/entities/Role";

import auth from "../../../../config/auth";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  permissions: string[];
  roles: string[];
  token: string;
  refresh_token: string;
}
@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("DayjsDateProvider")
    private dayjsDateProvider: IDateProvider,
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmailWithRolesAndPermissions(
      email,
    );
    const roles = user.roles.map(role => role.name);
    const permission = user.roles[0].permission.map(
      permission => permission.name,
    );
    const {
      expires_in_token,
      secret_refresh_token,
      secret_token,
      expires_in_refresh_token,
      expires_refresh_token_days,
    } = auth;

    if (!user) {
      throw new AppError("Email or password incorrect!");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect!");
    }

    // Gerar jsonwebtoken
    const token = sign(
      {
        permissions: permission,
        roles,
      },
      secret_token,
      {
        subject: user.id,
        expiresIn: expires_in_token,
      },
    );

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: user.id,
      expiresIn: expires_in_refresh_token,
    });

    const refresh_token_expires_date = this.dayjsDateProvider.addDays(
      expires_refresh_token_days,
    );

    await this.usersTokensRepository.create({
      user_id: user.id,
      expires_date: refresh_token_expires_date,
      refresh_token,
    });

    return {
      user: {
        name: user.name,
        email: user.email,
      },
      permissions: permission,
      roles,
      token,
      refresh_token,
    };
  }
}

export { AuthenticateUserUseCase };
