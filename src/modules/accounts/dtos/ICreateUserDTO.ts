interface ICreateUserDTO {
  name: string;
  password: string;
  username: string;
  email: string;
  roles: string;
  id?: string;
  avatar?: string;
}

export { ICreateUserDTO };
