export type User = {
  id?: number;
  name?: string;
  age?: number;
  email?: string;
  password?: string;
}

export type Team = {
  id?: number;
  name?: string;
  town?: string;
  foundationYear?: number;
}

export type StatusMessage = {
  message: string;
  type: 'error' | 'success';
}
