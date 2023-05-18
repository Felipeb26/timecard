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

  millisToTime(millis: any):string {
    if (millis instanceof String) {
      millis = Number(millis);
    }

    const hours = Math.floor(millis / (1000 * 60 * 60));
    const minutes = Math.floor((millis % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((millis % (1000 * 60)) / 1000);
    console.log(`Horas: ${hours} min: ${minutes} sec: ${seconds}`)
    return `Horas: ${hours} min: ${minutes} sec: ${seconds}`
  }

}
