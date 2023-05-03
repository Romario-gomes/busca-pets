import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreatePermissionUseCase } from "./CreatePermissionUseCase";

class CreatePermissionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createPermissionUseCase = container.resolve(CreatePermissionUseCase);
    const permission = await createPermissionUseCase.execute({
      name,
      description,
    });

    return response.status(201).json(permission);
  }
}

export { CreatePermissionController };
