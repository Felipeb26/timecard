const oitoHoras = new Date();
oitoHoras.setHours(8, 0, 0); // Defina as horas para 8

// Crie um objeto Date para 8 horas e 40 minutos
const oitoHorasQuarentaMinutos = new Date();
oitoHorasQuarentaMinutos.setHours(8, 40, 0); // Defina as horas para 8 e os minutos para 40

// Calcule a diferença em milissegundos
const diferencaEmMilissegundos =
  oitoHorasQuarentaMinutos.getTime() - oitoHoras.getTime();

// Converta a diferença para horas e minutos
const diferencaEmHoras = Math.floor(
  diferencaEmMilissegundos / (1000 * 60 * 60)
);
const diferencaEmMinutos = Math.floor(
  (diferencaEmMilissegundos % (1000 * 60 * 60)) / (1000 * 60)
);

console.log("Diferença em horas:", diferencaEmHoras);
console.log("Diferença em minutos:", diferencaEmMinutos);
