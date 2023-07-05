export interface Timecard {
  id?: string;
  dataCadastro: string;
  dataEntrada: string;
  dataSaida: string;
  jornadaTrabalho: string;
  saldo?: string;
  horasTrabalhadas?: string;
  tempoAlmoco: string;
}
