import { AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import eng from "@fullcalendar/core/locales/en-gb";
import ptBr from "@fullcalendar/core/locales/pt-br";
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Timecard } from 'src/app/interfaces/timecard';
import { SharePointService } from 'src/app/services/shared/share-point.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnChanges {

  @Input("data") timecards: Timecard[] = [];
  calendar: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    locales: [ptBr, eng],
    navLinks: true,
    eventClick: this.handleClick.bind(this),
  };

  constructor (private cdref:ChangeDetectorRef,
    private shared: SharePointService){}

  ngOnChanges(): void {
    this.cdref.detectChanges();
    setTimeout(() => this.showInCalendar(), 150);
  }

  showInCalendar() {
    const points: any[] = [];
    this.timecards.forEach(time => {
      const point = {
        title: this.setTitleName(time.data),
        date: time.data,
        color: "#197d19",
        background: "#197d84",
        data: time
      }
      points.push(point);
    });
    this.calendar.eventSources = [points, this.timecards];
  }

  setTitleName(data: string): string {
    const date = new Date(data).toLocaleString("pt-br");
    let day = date.substring(0, date.indexOf("/"))
    return `Dia ${day}`;
  }

  handleClick(args: any) {
    const def = args.event._def;
    const data = def.extendedProps.data;
    this.shared.changeValue(data)
  }

}
