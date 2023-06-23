import { BatsworksApiService } from 'src/app/services/batsworks-api.service';
import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/interfaces/persona';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  persona!: Persona


  constructor (
    private cookie: CookieService,
    private token: LoginService,
    private request: BatsworksApiService) { }

  ngOnInit(): void {
    const cookie = this.cookie.get("auth");
    const { sub } = this.token.decodeToken(cookie);


    this.request.findPersona(sub).subscribe(
      (data) => {
        console.log(data.nome);
        this.persona = data;
      },
      (error: any) => {
        console.log(error.message);
      }
    )
  }
}
