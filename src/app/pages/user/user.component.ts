import { BatsworksApiService } from 'src/app/services/batsworks-api.service';
import { Component, OnChanges, OnInit, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { Persona } from 'src/app/interfaces/persona';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from 'src/app/services/login.service';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  persona!: Persona;
  userForm!: FormGroup;
  dataNascimento: any;
  editar: boolean = false;
  pass: boolean = true;
  error: string = "assets/error.png"


  constructor (
    private utils: UtilsService,
    private cookie: CookieService,
    private token: LoginService,
    private request: BatsworksApiService,
    private cdrf: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.instaciateForm();
    this.cdrf.detectChanges();
    const { sub } = this.token.decodeToken(this.cookie.get("auth"));

    this.request.findPersona(sub).subscribe(
      (next: Persona) => {
        this.dataNascimento = new Date(next.dataNascimento).toLocaleDateString("pt-BR")
        this.persona = next;
      }, (error: any) => {
        this.utils.redirectOnUNAUTHORIZED(error)
        console.log(error.message);
        console.log(error.status);
      }, () => {
        console.log("usuario carregado")
      }
    )
  }

  instaciateForm() {
    this.userForm = new FormGroup({
      username: new FormControl(""),
      nome: new FormControl(""),
      email: new FormControl(""),
      idade: new FormControl(""),
      nascimento: new FormControl(""),
      senha: new FormControl("")
    });
  }

  editUser(persona: FormGroup) {
    const { username, nome, email, idade, nascimento, senha } = persona.value;
    console.log(persona.value)
  }

  deleteUser() {
    if (this.persona.id != undefined)
      this.request.deletePersona(this.persona.id).subscribe(
        (value: any) => {
          console.log(value)
        },
        (error: any) => {
          console.log(error.status);
          console.log(error);
        },
        () => {
          console.log("foi deletado com sucesso")
        }
      )
  }

}
