import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DateCalendarComponent } from '../date-calendar/date-calendar.component';
import { TimeComponent } from '../time/time.component';

@Component({
  selector: 'datetime-control',
  templateUrl: './datetime-control.component.html',
  styleUrls: ['./datetime-control.component.scss']
})
export default class DatetimeControlComponent implements OnInit {

  @Output("value") data = new EventEmitter<any>;

  @Input("placeholder") value: string = "dd /mm / yyyy";
  time: string = "";
  worker = new Worker(new URL('../../app.worker', import.meta.url));

  constructor (private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  calendarDialog() {
    const popup = this.dialog.open(DateCalendarComponent);
    popup.afterClosed().subscribe((data: Date) => {
      if (data === undefined) return;
      const dataToSet = data.toLocaleDateString("pt-BR");
      if (this.value.startsWith("d")) this.value = "";
      if (this.value.includes(":")) {
        this.value = `${dataToSet} ${this.value}`
        this.data.emit(this.value);
        return;
      }
      if (this.value.includes("/")) {
        const part = this.value.substring(this.value.indexOf(":") - 2);
        this.value = dataToSet + part;
        this.data.emit(this.value);
        return;
      }

      this.value = dataToSet;
      this.data.emit(this.value);
    })
  }

  timeDialog() {
    const popup = this.dialog.open(TimeComponent);
    popup.afterClosed().subscribe((data: any) => {
      if (data === undefined) return;

      const timeToSet = ` ${data.hours > 10 ? data.hours : '0' + data.hours}:${data.minutes > 10 ? data.minutes : '0' + data.minutes}`;
      if (this.value.startsWith("d")) {
        this.value = "";
      }
      if (this.value.includes(":")) {
        const part = this.value.substring(0, this.value.indexOf(":") - 2);
        this.value = part + timeToSet;
        this.data.emit(this.value);
        return;
      }
      this.value += timeToSet;
      this.data.emit(this.value);
    })
  }

  myWorker() {
    if (typeof Worker !== 'undefined') {
      // Create a new
      this.worker.onmessage = ({ data }) => {
        console.log(`Pages got message: ${data}`);
      };
      this.worker.postMessage("haha");
    } else {
      // Web workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
    }
  }

  public getPlaceHolderValue(): void {
    this.data.emit(this.value);
  }


}
