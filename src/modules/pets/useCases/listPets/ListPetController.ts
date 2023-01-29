import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListPetUseCase } from "./ListPetUseCase";

class ListPetsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listPetUseCase = container.resolve(ListPetUseCase);

    const pets = await listPetUseCase.execute();

    return response.json(pets);
  }
}

export { ListPetsController };
