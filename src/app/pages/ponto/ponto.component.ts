import { Message } from './../../interfaces/message';
import { CookieService } from 'ngx-cookie-service';
import { BatsworksApiService } from './../../services/batsworks-api.service';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Timecard } from 'src/app/interfaces/timecard';
import { LoginService } from 'src/app/services/login.service';
import { Persona } from 'src/app/interfaces/persona';

@Component({
  selector: 'app-ponto',
  templateUrl: './ponto.component.html',
  styleUrls: ['./ponto.component.scss']
})
export class PontoComponent {

  timecards: Timecard[] = [];
  tabelaIsVisible: boolean = false;

  constructor (
    private cdref: ChangeDetectorRef,
    private requests: BatsworksApiService,
    private toast: ToastrService,
    private cookie: CookieService,
    private token: LoginService,) { }

  ngOnInit(): void {
    this.makeRequest(true);
    this.cdref.detectChanges();
  }

  showComponent() {
    this.tabelaIsVisible = !this.tabelaIsVisible;
  }

  makeRequest(bool: boolean) {
    if (!bool) return;
    const { sub } = this.token.decodeToken(this.cookie.get("auth"));
    let id: string | undefined;

    this.requests.findPersona(sub).subscribe(
      (next: Persona) => {
        id = next.id;
      }, (error: any) => {
        this.toast.error(error.status, error.message);
      }, () => {
        if (id != undefined) {
          this.findCard(id);
        }
      }
    )
  }

  findCard(id: string) {
    this.requests.findCardByUserId(id).subscribe(
      (res: Timecard[]) => this.timecards = res,
      (error: any) => this.toast.error(error.message),
      () => this.toast.success("mostrando cardpoints salvos")
    );
  }

}
