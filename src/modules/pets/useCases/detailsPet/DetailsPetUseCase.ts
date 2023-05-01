import { inject, injectable } from "tsyringe";

import { IPetsRepository } from "../../repositories/IPetsRepository";

@injectable()
class DetailsPetUseCase {
  constructor(
    @inject("PetsRepository")
    private petsRepository: IPetsRepository,
  ) {}

  async execute(id: string) {
    const detailsPet = await this.petsRepository.getById(id);

    return detailsPet;
  }
}

export { DetailsPetUseCase };
