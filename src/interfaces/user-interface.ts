export interface User {
  id: string;
  name: string;
  email: string;
}

export interface UserCreate {
  email: string;
  name: string;
}

// Contrato para ser seguido no repositório
export interface UserRepository {
  create(data: UserCreate): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
}
