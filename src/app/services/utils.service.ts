import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  toHourObject(horario: string[]) {
    const h1 = horario[0];
    const h2 = horario[1];
    const h3 = horario[2];

    if (h3 == undefined) {
      return { hora: h1, minuto: "0" + h2 }
    }
    return { hora: h1, minuto: h2 + h3 }
  }

  constructor () { }

  millisToSeconds(millis: number) {
    return millis / 1000;
  }

  millisToMinutes(millis: number) {
    return Math.floor(millis / 60000);
  }

  millisToHours(millis: number) {
    return millis / (1000 * 60 * 60);
  }

  millisToTime(millis: any): { hours: number, minutes: number } {
    if (millis instanceof String) {
      millis = Number(millis);
    }
    const hours = Math.floor(millis / (1000 * 60 * 60));
    const minutes = Math.floor((millis % (1000 * 60 * 60)) / (1000 * 60));

    return { hours, minutes }
  }

  minusDate(subtrair: any, diminuir: number, param: number) {
    subtrair = String(subtrair);
    const hora = subtrair.split("")[0];
    const first_minute = subtrair.split("")[1];
    const second_minute = subtrair.split("")[2];

    const hours = hora == undefined ? 0 : Math.floor(Number(hora) * 60);
    let minutes = 0;

    if (first_minute != undefined && second_minute != undefined) {
      minutes = first_minute + second_minute;
    } else if (first_minute == undefined && second_minute == undefined) {
      minutes = 0
    } else if (second_minute == undefined) {
      minutes = 0 + first_minute;
    }

    const time = hours + Number(minutes);
    const final_time = time - diminuir * 60;
    let final_hour = Math.floor(final_time / 60);
    let final_minute = Math.floor(final_time % 60);

    if (final_hour != undefined && final_hour > 0) {
      final_hour = final_hour - param
    }

    if (final_hour == undefined || final_hour <= 0) {
      final_minute = -Math.abs(final_minute);
    }

    return `${final_hour}.${final_minute}`
  }

  isPositive(param: number): boolean {
    if (param < 0) return false
    return true;
  }

  valueOrZero(param: any): number {
    if (param == undefined) return 0;
    if (param instanceof String && param.trim() == "") return 0;
    if (param == null) return 0;
    return Number(param);
  }

}
