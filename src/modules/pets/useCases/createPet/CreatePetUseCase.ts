import { inject, injectable } from "tsyringe";

import { ICreatePetDTO } from "../../dtos/ICreatePetDTO";
import { Pet } from "../../infra/typeorm/entities/Pet";
import { IPetsRepository } from "../../repositories/IPetsRepository";

@injectable()
class CreatePetUseCase {
  constructor(
    @inject("PetsRepository")
    private petsRepository: IPetsRepository,
  ) {}
  async execute({
    name,
    type,
    age,
    weight,
    genre,
  }: ICreatePetDTO): Promise<Pet> {
    const pet = await this.petsRepository.create({
      name,
      type,
      age,
      weight,
      genre,
    });
    return pet;
  }
}

export { CreatePetUseCase };
