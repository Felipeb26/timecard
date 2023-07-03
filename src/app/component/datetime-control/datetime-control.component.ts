import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'datetime-control',
  templateUrl: './datetime-control.component.html',
  styleUrls: ['./datetime-control.component.scss']
})
export default class DatetimeControlComponent implements AfterViewInit {
  showdate: boolean = true;
  value: string = "dd /mm / yyyy";
  time: string = "";


  days: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
    16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  months: string[] = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"]
  weeks: string[] = ["dom", "seg", "ter", "qua", "qui", "sex", "sab"]
  currentYear: number = 0;
  currentMonth: number = 0;

  constructor () { }

  ngAfterViewInit(): void {
    this.initial();
  }

  initial() {
    let date = new Date();
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth();

    this.currentYear = currentYear;
    this.currentMonth = currentMonth;

    this.setNowDate(currentYear, currentMonth)
    this.renderCalendar(currentYear, currentMonth)
  }

  setNowDate(currentYear: number, currentMonth: number){
    const current = document.getElementById("current");
    console.log(currentMonth, currentYear)
    current!.innerText = `${this.months[currentMonth]} ${currentYear}`;
  }

  renderCalendar(currentYear: number, currentMonth: number) {
    const days = document.getElementById("days");

    const firstDateMonth = new Date(currentYear, currentMonth, 1).getDay();
    const ultimoDiaMes = new Date(currentYear, currentMonth + 1, 0).getDate();
    const ultimoDiaMesPassado = new Date(currentYear, currentMonth, 0).getDate();

    const li = days!.getElementsByTagName("li") as HTMLCollectionOf<HTMLElement>;

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
      li[(mid + i) - 1].innerText = `${i}`;
      stop++;
    }

    for (var i = ultimoDiaMes; i >= 5; i++) {
      const proximoDias = Math.abs(ultimoDiaMesPassado - i + 1);
      if (proximoDias != 0) {
        li[stop].innerText = `${proximoDias}`
        li[stop].classList.add("inactive");
        stop++;
      }
    }
  }

  previusMonth(event: MouseEvent) {
    this.currentMonth--;
    this.setNowDate(this.currentYear, this.currentMonth)
    this.renderCalendar(this.currentYear, this.currentMonth)
  }

  nextMonth() {
    this.currentMonth++;
    this.setNowDate(this.currentYear, this.currentMonth)
    this.renderCalendar(this.currentYear, this.currentMonth)

  }

  openDatePicker() {
    this.initial()
  }

  getTimeInputValue() {
    const input_time = document.getElementById("time") as HTMLInputElement;
    input_time.showPicker();
    input_time.addEventListener('change', (event: Event) => {
      let selectedDate = input_time.value;
      if (selectedDate == null || selectedDate.trim() === "") return;
      selectedDate = " " + selectedDate;
      this.value += selectedDate;
      console.log('Selected date:', selectedDate);
    });
  }


}
