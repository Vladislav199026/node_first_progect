import fs from 'fs';

interface User {
    login: string;
    password: string;
}

export function saveUser(user: User): Promise<void> {
  return new Promise((resolve, reject) => {
      fs.readFile('db.json', 'utf8', (err, data) => {
          if (err && err.code !== 'ENOENT') {
              reject(err);
              return;
          }
          const db = data ? JSON.parse(data) : { users: [] };
          db.users.push(user);

          fs.writeFile('db.json', JSON.stringify(db, null, 2), 'utf8', (err) => {
              if (err) {
                  reject(err);
                  return;
              }
              console.log('User successfully added to the database.');
              resolve();
          });
      });
  });
}

export function getUsersList(): Promise<User[]> {
    return new Promise((resolve, reject) => {
        fs.readFile('db.json', 'utf8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            const db = JSON.parse(data);
            resolve(db.users);
        });
    });
}
