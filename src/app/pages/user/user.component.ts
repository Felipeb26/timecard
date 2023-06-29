import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Persona } from 'src/app/interfaces/persona';
import { BatsworksApiService } from 'src/app/services/batsworks-api.service';
import { LoginService } from 'src/app/services/login.service';
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
    private toastr: ToastrService,
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
        this.toastr.error(error.status, error.message);
      }, () => {
        this.toastr.success("usuario carregado")
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
    if (this.persona.id != undefined) {
      const entity = {
        id: this.persona.id,
        username: username,
        nome: nome,
        email: email,
        idade: idade,
        dataNascimento: nascimento,
        senha: senha
      }
      console.table(entity)

      this.request.editPersona(entity.id, entity).subscribe(
        (next: Persona) => {
          this.persona = next;
        }, (error: any) => this.toastr.error(error.error.reason),
        () => {
          this.toastr.success("usuario atualizado");
        }
      )
    }
  }

  deleteUser() {
    if (this.persona.id != undefined)
      this.request.deletePersona(this.persona.id).subscribe(
        (value: any) => {
          this.toastr.success(value.status)
        },
        (error: any) => {
          this.toastr.error(error.status, error.message);
        },
        () => {
          this.toastr.success("foi deletado com sucesso")
        }
      )
  }

}
