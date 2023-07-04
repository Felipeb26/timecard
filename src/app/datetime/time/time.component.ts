import { AfterViewInit, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss']
})
export class TimeComponent implements AfterViewInit {

  hours: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
  minutes: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59]

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

}

