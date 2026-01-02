type User = {
  id: number;
  email: string;
  password: string; // plain text (sirf demo ke liye)
};

let users: User[] = [];
let nextId = 1;

export function createUser(email: string, password: string): User | null {
  const existing = users.find((u) => u.email === email);
  if (existing) return null;

  const user: User = { id: nextId++, email, password };
  users.push(user);
  return user;
}

export function findUser(email: string, password: string): User | null {
  const user = users.find(
    (u) => u.email === email && u.password === password
  );
  return user || null;
}
