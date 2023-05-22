import { ToastrService } from 'ngx-toastr';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Timecard } from 'src/app/interfaces/timecard';
import { RequestsService } from 'src/app/services/requests.service';
import { SharePointService } from 'src/app/services/shared/share-point.service';

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
  tabelaIsVisible: boolean = false;

  constructor (private cdref: ChangeDetectorRef,
    private requests: RequestsService,
    private toast: ToastrService,) { }

  ngOnInit(): void {
    this.makeRequest(true);
    this.cdref.detectChanges();
  }

  showComponent() {
    this.tabelaIsVisible = !this.tabelaIsVisible;
  }

  makeRequest(bool: boolean) {
    if (!bool) return;
    this.requests.findAll().subscribe(
      (res: Timecard[]) => this.timecards = res,
      (error: any) => this.toast.success(error)
    );
  }

}
