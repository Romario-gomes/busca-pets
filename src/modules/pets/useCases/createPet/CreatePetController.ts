import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreatePetUseCase } from "./CreatePetUseCase";

class CreatePetController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, type, genre, weight, age } = request.body;

    const createPetUseCase = container.resolve(CreatePetUseCase);

    const pet = await createPetUseCase.execute({
      name,
      type,
      genre,
      weight,
      age,
    });

    return response.status(201).json(pet);
  }
}

export { CreatePetController };
