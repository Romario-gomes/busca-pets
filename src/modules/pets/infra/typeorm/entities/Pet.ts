import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("pets")
class Pet {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  age: number;

  @Column()
  weight: number;

  @Column()
  genre: string;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Pet };
