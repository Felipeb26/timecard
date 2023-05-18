import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Timecard } from 'src/app/interfaces/timecard';
import { RequestsService } from 'src/app/services/requests.service';

const MID_GREEN = "#197d19";
const DEEP_BLACK = "rgb(21, 21, 21)";
const TABLE = "table";
const CALENDAR = "calendar";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  tabela = document.getElementsByTagName("app-point-table") as HTMLCollectionOf<HTMLElement>;;
  calendar = document.getElementsByTagName("app-calendar") as HTMLCollectionOf<HTMLElement>;;
  timecards: Timecard[] = [];
  tabelaIsVisible: boolean = true;

  constructor (private requests: RequestsService,
    private toast:ToastrService) { }

  ngOnInit(): void {
    this.hideComponents(this.tabelaIsVisible);
    this.setDisableStyle(CALENDAR, TABLE)
    this.requests.findAll().subscribe(
      (res:Timecard[]) =>  this.timecards = res,
      (error:any) => this.toast.success(error)
    );
  }

  showComponent(value: string, valu: string) {
    this.tabelaIsVisible = !this.tabelaIsVisible;
    this.hideComponents(this.tabelaIsVisible);
    this.setDisableStyle(value, valu);
  }

  hideComponents(props: boolean) {
    for (let i = 0; i < this.calendar.length; i++) {
      if (props) {
        this.calendar[i].style.display = "none";
        this.tabela[i].style.display = "";
      } else {
        this.calendar[i].style.display = "";
        this.tabela[i].style.display = "none";
      }
    }
  }

  setDisableStyle(enable: string, disable: string) {
    const btnSelect = document.getElementById(enable);
    const btnToSelect = document.getElementById(disable)

    btnSelect!.style.background = "#C0C0C0";
    btnSelect!.style.boxShadow = "none";

    btnToSelect!.style.boxShadow = `0 0 0.5rem ${DEEP_BLACK}`;
    btnToSelect!.style.backgroundColor = `${MID_GREEN}`;
  }

}
