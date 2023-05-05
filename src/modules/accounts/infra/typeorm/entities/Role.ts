import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import Permission from "./Permission";

@Entity("roles")
class Role {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToMany(() => Permission)
  @JoinTable({
    name: "permissions_roles",
    joinColumns: [{ name: "role_id" }],
    inverseJoinColumns: [{ name: "permission_id" }],
  })
  permission: Permission[];

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export default Role;
