import { verify, sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

import auth from "../../../../config/auth";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";

interface IPayLoad {
  sub: string;
  email: string;
}

interface IResponse {
  permissions: string[];
  roles: string[];
  token: string;
  refreshToken: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("DayjsDateProvider")
    private dayjsDateProvider: IDateProvider,
  ) {}

  async execute(token: string): Promise<IResponse> {
    const { email, sub } = verify(token, auth.secret_refresh_token) as IPayLoad;

    const { expires_in_token, secret_token } = auth;

    const user_id = sub;
    const userToken =
      await this.usersTokensRepository.findByUserIdAndRefreshToken(
        user_id,
        token,
      );

    if (!userToken) {
      throw new AppError("Refresh Token does not exists!");
    }
    const userPermissionsAndRoles =
      await this.usersRepository.findByIdWithRolesAndPermissions(user_id);

    const roles = userPermissionsAndRoles.roles.map(role => role.name);
    const permission = userPermissionsAndRoles.roles[0].permission.map(
      permission => permission.name,
    );
    const newToken = sign(
      {
        email,
        permissions: permission,
        roles,
      },
      secret_token,
      {
        subject: user_id,
        expiresIn: expires_in_token,
      },
    );

    await this.usersTokensRepository.deleteById(userToken.id);

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: sub,
      expiresIn: auth.expires_in_refresh_token,
    });

    const expires_date = this.dayjsDateProvider.addDays(
      auth.expires_refresh_token_days,
    );

    await this.usersTokensRepository.create({
      user_id,
      expires_date,
      refresh_token,
    });

    return {
      token: newToken,
      refreshToken: refresh_token,
      permissions: permission,
      roles,
    };
  }
}

export { RefreshTokenUseCase };
