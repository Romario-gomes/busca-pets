import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";

import auth from "../../../../config/auth";
import { UsersTokensRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { AppError } from "../../../errors/AppError";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  // Padrão JWT
  // Bearer 'token que está sendo passado'
  const authHeader = request.headers.authorization;
  const usersTokensRepository = new UsersTokensRepository();
  const usersRepository = new UsersRepository();

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  // desestruturar o token
  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      auth.secret_refresh_token,
    ) as IPayload;

    const user = await usersTokensRepository.findByUserIdAndRefreshToken(
      user_id,
      token,
    );

    const roleUser = await usersRepository.findByIdWithRolesAndPermissions(
      user_id,
    );

    if (!user) {
      throw new AppError("User does not exists!", 401);
    }

    const rolesName = roleUser.roles.map(role => role.name);

    request.user = {
      id: user_id,
      roles: rolesName,
      permissions: roleUser.roles.flatMap(role =>
        role.permission.map(p => p.name),
      ),
    };
    /* const existsRoles = userRoles?.some(r => role.includes(r)); */

    /* if (existsRoles) {
      return next();
    } */

    next();
  } catch (error) {
    console.log(error);
    throw new AppError("Invalid token!", 401);
  }
}

export function ensureAuthorized(roles: string[]) {
  return (request: Request, response: Response, next: NextFunction) => {
    const userRoles = request.user.roles;

    const hasPermission = roles.some(role => userRoles.includes(role));
    console.log("Permissoes: ", hasPermission);
    if (!hasPermission) {
      throw new AppError("Unauthorized", 403);
    }

    next();
  };
}

export function ensurePermission(permission: string[]) {
  return (request: Request, response: Response, next: NextFunction) => {
    const { permissions } = request.user;

    const hasPermission = permission.some(permission =>
      permissions.includes(permission),
    );

    if (!hasPermission) {
      throw new AppError("Invalid Permission", 403);
    }

    return next();
  };
}
