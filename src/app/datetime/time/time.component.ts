import { AfterViewInit, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss']
})
export class TimeComponent implements AfterViewInit {

  hourScroll: number = 0;

  hora: number = 0;
  minuto: number = 0;
  minute_value: number = 0;

  constructor (private ref: MatDialogRef<TimeComponent>) { }

  ngAfterViewInit(): void {
    this.listenToTime()
  }

  resetMinuteLI(uls: HTMLElement) {
    const lis = uls.getElementsByTagName("li");
    for (let l = 0; l < lis.length; l++) {
      lis[l].classList.remove("active");
    }
  }

  listenToTime() {
    const ulMinutes = document.getElementById("minutes");
    const lis = ulMinutes!.getElementsByTagName("li");
    for (let l = 0; l < lis.length; l++) {
      lis[l].addEventListener("click", (e) => {
        this.resetMinuteLI(ulMinutes!)
        lis[l].classList.add("active")
        const value = e.target as HTMLElement;
      });
    }

    const ulHours = document.getElementById("hours");
    const lisHour = ulHours!.getElementsByTagName("li");
    for (let l = 0; l < lisHour.length; l++) {
      lisHour[l].addEventListener("click", (e) => {
        this.resetMinuteLI(ulHours!)
        lisHour[l].classList.add("active")
        const value = e.target as HTMLElement;
      });
    }


  }

  getTime() {
    const time = { hours: 0, minutes: 0 };

    const ulMinutes = document.getElementById("minutes");
    const lisMinutes = ulMinutes!.getElementsByTagName("li");
    for (let l = 0; l < lisMinutes.length; l++) {
      if (lisMinutes[l].className.includes("active")) {
        time.minutes = Number(lisMinutes[l].textContent);
      }
    }

    const ulHours = document.getElementById("hours");
    const lisHour = ulHours!.getElementsByTagName("li");
    for (let l = 0; l < lisHour.length; l++) {
      if (lisHour[l].className.includes("active")) {
        time.hours = Number(lisHour[l].textContent);
      }
    }
    this.ref.close(time)
  }

  upValue(which: number) {
    if (which === 0) {
      const horas = document.getElementById("hours");
      const li = horas!.getElementsByTagName("li")[0];
      const value = li!.textContent;
      if (value == null) return;
      let newValue = Number(value) + 1;
      if (newValue >= 25) newValue = 0;
      li!.textContent = `${newValue}`
    } else {
      const horas = document.getElementById("minutes");
      const li = horas!.getElementsByTagName("li")[0];
      const value = li!.textContent;
      if (value == null) return;
      let newValue = Number(value) + 1;
      if (newValue >= 60) newValue = 0;
      li!.textContent = `${newValue}`
    }
  }

  downValue(which: number) {
    if (which === 0) {
      const horas = document.getElementById("hours");
      const li = horas!.getElementsByTagName("li")[0];
      const value = li!.textContent;
      if (value == null) return;
      let newValue = Number(value) - 1;
      if (newValue <= -1) newValue = 0;
      li!.textContent = `${newValue}`
    } else {
      const horas = document.getElementById("minutes");
      const li = horas!.getElementsByTagName("li")[0];
      const value = li!.textContent;
      if (value == null) return;
      this.minute_value = Number(value) - 1;
      if (this.minute_value <= -1) this.minute_value = 0;
      li!.textContent = `${this.minute_value}`
    }
  }

}

