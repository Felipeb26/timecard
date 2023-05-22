import { ChangeDetectorRef, Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Timecard } from 'src/app/interfaces/timecard';
import { RequestsService } from 'src/app/services/requests.service';


@Component({
  selector: 'app-ponto',
  templateUrl: './ponto.component.html',
  styleUrls: ['./ponto.component.scss']
})
export class PontoComponent {

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
