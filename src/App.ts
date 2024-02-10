import axios from 'axios';

// first task
interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

interface IAlbum {
  userId: number;
  id: number;
  title: string;
}

interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

type TResponse = IUser[] | IPost[] | IAlbum[];

const urls: string[] = [
  'https://jsonplaceholder.typicode.com/users',
  'https://jsonplaceholder.typicode.com/albums',
  'https://jsonplaceholder.typicode.com/posts',
];

const fetchData = async <T>(url: string): Promise<T> => {
  try {
      return await axios.get<T>(url).then((response) => response.data);
  } catch (error) {
      throw error;
  }
};

const fetchSequentially = async (urls: string[]): Promise<TResponse[]> => {
  const results: Array<TResponse> = [];
  for (const url of urls) {
      await fetchData<TResponse>(url).then((response) => results.push(response));
  }
  return results;
};

fetchSequentially(urls)
  .then((results) => {
      console.log('Results:', results);
  })
  .catch((error) => {
      console.error('Error:', error);
  })

// second task
interface User {
  username: string;
  password: string;
}

const users: User[] = [
  { username: 'user1', password: 'password1' },
  { username: 'user2', password: 'password2' },
  { username: 'user3', password: 'password3' },
  { username: 'admin', password: 'admin123' }
];

const authenticateUser = (username: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
      const user = users.find((user) => user.username === username);

      !user
        ? reject(new Error('Користувача з таким іменем не знайдено'))
        : user.password === password
        ? resolve(user)
        : reject(new Error('Неправильний пароль'));
    });
};

authenticateUser('admin', 'admin123')
  .then((user) => {
      console.log('Користувач автентифікований:', user);
  })
  .catch((error) => {
      console.error('Помилка аутентифікації:', error.message);
  });
