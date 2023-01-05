import { PetsRepositoryInMemory } from "../../repositories/in-memory/PetRepositoryInMemory";
import { CreatePetUseCase } from "./CreatePetUseCase";

let createPetUseCase: CreatePetUseCase;
let petsRepository: PetsRepositoryInMemory;

describe("Create Pet", () => {
  beforeEach(() => {
    petsRepository = new PetsRepositoryInMemory();
    createPetUseCase = new CreatePetUseCase(petsRepository);
  });

  it("Should be able to create a new Pet", async () => {
    const pet = await createPetUseCase.execute({
      name: "Billy",
      age: 2,
      type: "Dog",
      weight: 40,
      genre: "masculine",
    });

    expect(pet).toHaveProperty("id");
  });
});
