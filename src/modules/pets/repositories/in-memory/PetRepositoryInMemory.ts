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
  listAll(): Promise<Pet[]> {
    throw new Error("Method not implemented.");
  }
  getById(id: string): Promise<Pet> {
    throw new Error("Method not implemented.");
  }
}

export { PetsRepositoryInMemory };
