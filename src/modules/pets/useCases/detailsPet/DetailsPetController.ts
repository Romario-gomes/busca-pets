import { Request, Response } from "express";
import { container } from "tsyringe";

import { DetailsPetUseCase } from "./DetailsPetUseCase";

class DetailsPetController {
  async handle(request: Request, response: Response): Promise<Response> {
    const detailsPetUseCase = container.resolve(DetailsPetUseCase);
    const { id } = request.params;

    const detailPet = await detailsPetUseCase.execute(id);

    return response.json(detailPet);
  }
}

export { DetailsPetController };
