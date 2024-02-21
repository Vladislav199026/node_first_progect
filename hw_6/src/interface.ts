export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  age: number;
  phone: string;
}

export interface IRole {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}