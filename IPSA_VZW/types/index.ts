export type User = {
  id?: number;
  name?: string;
  age?: number;
  email?: string;
  password?: string;
}

export type Vraag = {
  id?: number;
  type?: string;
  vraag?: string;
  antwoorden?: Antwoord[];
  resultaat?: Resultaat[];
}

export type Antwoord = {
  id?: number,
  correct: boolean,
  antwoord: string,
}

export type Resultaat = {
  id?: number,
  resultaat?: string,
}

export type StatusMessage = {
  message: string;
  type: 'error' | 'success';
}

export type LoginUser = {
    email: string;
    password: string;
};

export type Role = 'USER' | 'ADMIN';

export type LoginUserResponse = {
    email: string;
    role: Role;
    username: String;
    token: string;
};