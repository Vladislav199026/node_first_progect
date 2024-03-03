import { IUser } from './interface';

export const users: IUser[] = [
  {
    id: "1",
    username: "user1",
    // password below - Password1,
    password: "$argon2id$v=19$m=65536,t=3,p=4$4H8xXk9kN5kJCRckjqvBqQ$uWDoz9cXtC6Am9NvP9fcRs5elQxpxzqq+d7qD1rAf7s",
    email: "user1@example.com"
  },
];
