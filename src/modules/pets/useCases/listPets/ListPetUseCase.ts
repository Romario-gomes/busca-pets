import { injectable, inject } from "tsyringe";

import { Pet } from "../../infra/typeorm/entities/Pet";
import { IPetsRepository } from "../../repositories/IPetsRepository";

@injectable()
class ListPetUseCase {
  constructor(
    @inject("PetsRepository")
    private petsRepository: IPetsRepository,
  ) {}

  async execute(): Promise<Pet[]> {
    const pets = await this.petsRepository.listAll();

    return pets;
  }
}

export { ListPetUseCase };
