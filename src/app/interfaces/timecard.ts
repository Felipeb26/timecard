import { Persona } from "./persona";

export interface Timecard {
  id?: string;
  dataCadastro: string;
  dataEntrada: string;
  dataSaida: string;
  jornadaTrabalho: string;
  saldo?: number;
  horasTrabalhadas?: string;
  tempoAlmoco: string;
  personaDTO: Persona
}
