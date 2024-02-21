import { IRole, IUser } from './interface';

export const users: IUser[] = [
  {
    id: '1',
    firstName: "John",
    lastName: "Doe",
    address: "123 Main St",
    age: 30,
    phone: "555-1234"
  },
  {
    id: '2',
    firstName: "Jane",
    lastName: "Smith",
    address: "456 Elm St",
    age: 25,
    phone: "555-5678"
  },
  {
    id: '3',
    firstName: "Alice",
    lastName: "Johnson",
    address: "789 Oak St",
    age: 35,
    phone: "555-9012"
  },
  {
    id: '4',
    firstName: "Bob",
    lastName: "Brown",
    address: "101 Pine St",
    age: 40,
    phone: "555-3456"
  },
  {
    id: '5',
    firstName: "Emily",
    lastName: "Davis",
    address: "202 Maple St",
    age: 28,
    phone: "555-7890"
  }
];

export const roles: IRole[] = [
  {
    id: '1',
    name: "Admin",
    description: "Administrator role",
    permissions: ["create", "read", "update", "delete"]
  },
  {
    id: '2',
    name: "User",
    description: "Regular user role",
    permissions: ["read"]
  },
  {
    id: '3',
    name: "Manager",
    description: "Manager role",
    permissions: ["read", "update"]
  }
];
