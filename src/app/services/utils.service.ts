import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

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

  millisToTime(millis: any): string {
    if (millis instanceof String) {
      millis = Number(millis);
    }
    const hours = Math.floor(millis / (1000 * 60 * 60));
    const minutes = Math.floor((millis % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((millis % (1000 * 60)) / 1000);
    return ` ${hours} horas ${minutes} min`
  }

  minusDate(subtrair: any, diminuir: number) {
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
    return `${Math.floor(final_time / 60)}.${Math.floor(final_time % 60)}`
  }

}
