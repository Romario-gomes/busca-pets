import { Request, Response } from "express";
import { container } from "tsyringe";

import { ShowUserUseCase } from "./ShowUserUseCase";

class ShowUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { authorization } = request.headers;

    const [, token] = authorization?.split(" ");
    const showUserUseCase = container.resolve(ShowUserUseCase);
    const user = await showUserUseCase.execute({
      token,
    });

    const roles = user.roles.map(role => role.name);
    const permission = user.roles[0].permission.map(
      permission => permission.name,
    );
    return response.status(200).json({
      email: user.email,
      permissions: permission,
      roles,
    });
  }
}

export { ShowUserController };
