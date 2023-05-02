import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { Pet } from "../../infra/typeorm/entities/Pet";
import { IPetsRepository } from "../../repositories/IPetsRepository";

@injectable()
class DetailsPetUseCase {
  constructor(
    @inject("PetsRepository")
    private petsRepository: IPetsRepository,
  ) {}

  async execute(id: string): Promise<Pet | AppError> {
    const detailsPet = await this.petsRepository.getById(id);

    if (!detailsPet) {
      return new AppError("Erro ao buscar pet");
    }

    return detailsPet;
  }
}

export { DetailsPetUseCase };
