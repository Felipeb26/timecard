import { AuthProvider } from "./auth-provider";

export interface Persona {
  nome: string;
  username: string;
  email: string;
  idade: string | number;
  dataNascimento: string;
  senha: string;
  authenticationProvider: AuthProvider;
  cardpoints: any
}
