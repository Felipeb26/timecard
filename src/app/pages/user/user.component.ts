import { BatsworksApiService } from 'src/app/services/batsworks-api.service';
import { Component, OnChanges, OnInit, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { Persona } from 'src/app/interfaces/persona';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnChanges {

  sub: any;
  persona!: Persona;
  editar: boolean = false;

  constructor (
    private cookie: CookieService,
    private token: LoginService,
    private request: BatsworksApiService,
    private cdrf: ChangeDetectorRef) { }

  ngOnInit(): void {
    const cookie = this.cookie.get("auth");
    const { sub } = this.token.decodeToken(cookie);

    this.sub = sub;

    this.request.findPersona(sub).subscribe(
      (data) => {
        console.table(data);
        this.persona = data;
      },
      (error: any) => {
        console.log(error.message);
      }
    )
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.cdrf.detectChanges();
    console.log(this.persona)
  }


}
