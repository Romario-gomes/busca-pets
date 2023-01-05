import { ICreatePetDTO } from "../../dtos/ICreatePetDTO";
import { Pet } from "../../infra/typeorm/entities/Pet";
import { IPetsRepository } from "../IPetsRepository";

class PetsRepositoryInMemory implements IPetsRepository {
  pets: Pet[] = [];
  async create({
    name,
    type,
    genre,
    weight,
    age,
  }: ICreatePetDTO): Promise<Pet> {
    const pet = new Pet();

    Object.assign(pet, {
      name,
      type,
      genre,
      weight,
      age,
    });

    this.pets.push(pet);
    return pet;
  }
}

export { PetsRepositoryInMemory };
