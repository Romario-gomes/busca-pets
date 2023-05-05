import Permission from "../infra/typeorm/entities/Permission";

interface ICreateRoleDTO {
  name: string;
  description: string;
  permissions?: Permission[];
}

export { ICreateRoleDTO };
