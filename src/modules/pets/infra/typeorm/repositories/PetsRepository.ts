import { Repository, getRepository } from "typeorm";

import { ICreatePetDTO } from "../../../dtos/ICreatePetDTO";
import { IPetsRepository } from "../../../repositories/IPetsRepository";
import { Pet } from "../entities/Pet";

class PetsRepository implements IPetsRepository {
  private repository: Repository<Pet>;

  constructor() {
    this.repository = getRepository(Pet);
  }

  async create({
    name,
    age,
    type,
    weight,
    genre,
  }: ICreatePetDTO): Promise<Pet> {
    const pet = this.repository.create({
      name,
      age,
      type,
      weight,
      genre,
    });

    await this.repository.save(pet);

    return pet;
  }

  async listAll(): Promise<Pet[]> {
    const pets = this.repository.find();

    return pets;
  }

  async getById(id: string): Promise<Pet> {
    const pets = this.repository.findOne(id);

    return pets;
  }
}
export { PetsRepository };
