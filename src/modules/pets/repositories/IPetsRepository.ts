import { ICreatePetDTO } from "../dtos/ICreatePetDTO";
import { Pet } from "../infra/typeorm/entities/Pet";

interface IPetsRepository {
  create(data: ICreatePetDTO): Promise<Pet>;
}

export { IPetsRepository };
