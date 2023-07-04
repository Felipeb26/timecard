import { AfterViewInit, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-date-calendar',
  templateUrl: './date-calendar.component.html',
  styleUrls: ['./date-calendar.component.scss']
})
export class DateCalendarComponent implements AfterViewInit {

  days: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
    16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  months: string[] = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"]
  weeks: string[] = ["dom", "seg", "ter", "qua", "qui", "sex", "sab"]
  currentYear: number = 0;
  currentMonth: number = 0;

  constructor (private ref: MatDialogRef<DateCalendarComponent>) { }

  ngAfterViewInit(): void {
    this.initial();
  }

  initial() {
    let date = new Date();
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth();

    this.currentYear = currentYear;
    this.currentMonth = currentMonth;

    this.setNowDate(currentYear, currentMonth);
    this.renderCalendar(currentYear, currentMonth)
  }

  setNowDate(currentYear: number, currentMonth: number) {
    const current = document.getElementById("current");
    current!.innerText = `${this.months[currentMonth]} ${currentYear}`;
  }

  renderCalendar(currentYear: number, currentMonth: number) {
    const date = new Date();
    const days = document.getElementById("days");

    const todayDay = new Date().getDate();
    const firstDateMonth = new Date(currentYear, currentMonth, 1).getDay();
    const ultimoDiaMes = new Date(currentYear, currentMonth + 1, 0).getDate();
    const ultimoDiaMesPassado = new Date(currentYear, currentMonth, 0).getDate();

    const li = days!.getElementsByTagName("li") as HTMLCollectionOf<HTMLElement>;
    this.eventListener(li)

    let stop = 0;
    let first = 0;

    for (let i = firstDateMonth; i > 0; i--) {
      li[first].innerText = `${ultimoDiaMesPassado - i + 1}`;
      li[first].classList.add("inactive");
      first++;
      stop++;
    }

    const mid = stop;
    for (var i = 1; i <= ultimoDiaMes; i++) {
      if (i == todayDay && this.currentMonth === date.getMonth()) {
        li[(mid + i) - 1].classList.add("active")
      }
      li[(mid + i) - 1].innerText = `${i}`;
      li[(mid + i) - 1].classList.add("noop")
      stop++;
    }

    this.lastDaysRender(ultimoDiaMes, ultimoDiaMesPassado, li, stop);
  }

  lastDaysRender(ultimoDiaMes: number, ultimoDiaMesPassado: number, li: HTMLCollectionOf<HTMLElement>, stop: number) {
    const proximoDias = Math.abs(ultimoDiaMesPassado - ultimoDiaMes);
    for (var i = proximoDias; i <= 15; i++) {
      if (i > 0) {
        if (li[stop] !== undefined) {
          li[stop].innerText = `${i}`
          li[stop].classList.add("inactive")
          stop++;
        }
      }
    }
  }

  resetLiClass() {
    const days = document.getElementById("days");
    const lis = days!.getElementsByTagName("li") as HTMLCollectionOf<HTMLElement>;
    for (let index = 0; index < lis.length; index++) {
      lis[index].classList.remove("active", "inactive")
      lis[index].classList.add("noop")
    }
  }

  eventListener(lis: HTMLCollectionOf<HTMLElement>) {
    for (let index = 0; index < lis.length; index++) {
      lis[index].addEventListener("click", (e) => {
        e.preventDefault();
        const li = e.target as HTMLElement;
        if (li.textContent !== null) {
          this.ref.close(new Date(this.currentYear, this.currentMonth, Number(li.textContent)))
        }
      });
    }
  }

  todayDate() {
    this.resetLiClass();
    const date = new Date();
    this.currentMonth = date.getMonth();
    this.currentYear = date.getFullYear();
    this.setNowDate(this.currentYear, this.currentMonth);
    this.renderCalendar(this.currentYear, this.currentMonth);
  }

  previusMonth() {
    this.resetLiClass()
    this.currentMonth--;
    if (this.currentMonth <= -1) {
      this.currentMonth = 11;
      this.currentYear--;
    }
    this.setNowDate(this.currentYear, this.currentMonth)
    this.renderCalendar(this.currentYear, this.currentMonth)
  }

  nextMonth() {
    this.resetLiClass()
    this.currentMonth++;
    if (this.currentMonth >= 12) {
      this.currentMonth = 0;
      this.currentYear++;
    }
    this.setNowDate(this.currentYear, this.currentMonth)
    this.renderCalendar(this.currentYear, this.currentMonth)
  }
}
