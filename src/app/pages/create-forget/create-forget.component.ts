import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Token } from 'src/app/interfaces/token';
import { BatsworksApiService } from 'src/app/services/batsworks-api.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-create-forget',
  templateUrl: './create-forget.component.html',
  styleUrls: ['./create-forget.component.scss']
})
export class CreateForgetComponent implements OnInit {
  userForm!: FormGroup;
  showPassword: boolean = false;


  constructor (
    private router: Router,
    private toastr: ToastrService,
    private cookie: CookieService,
    private service: LoginService,
    private requests: BatsworksApiService) { }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      username: new FormControl(""),
      nome: new FormControl(""),
      email: new FormControl(""),
      idade: new FormControl(""),
      nascimento: new FormControl(""),
      senha: new FormControl("")
    });
  }

  registerUser(persona: FormGroup) {
    const { email, idade, nascimento, nome, senha, username } = persona.value;
    if (persona.invalid) {
      this.toastr.error("todos os campos devem ser preenchidos");
      return;
    }
    const entity = {
      username: username,
      nome: nome,
      email: email,
      idade: idade,
      dataNascimento: nascimento,
      senha: senha
    }

    this.requests.registerPersona(entity).subscribe(
      (next: Token) => {
        console.log(next);
        this.cookie.set("auth", next.token, { expires: this.requests.authTime() });
        this.toastr.success("usuario registrado com sucesso")
        this.service.isUserLogged(true)
      }, (error: any) => {
        this.toastr.error(error.error.reason)
      },
      () => this.router.navigate([""])
    )
  }


}
