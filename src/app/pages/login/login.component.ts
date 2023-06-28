import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { Login } from 'src/app/interfaces/login';
import { BatsworksApiService } from 'src/app/services/batsworks-api.service';
import { Token } from 'src/app/interfaces/token';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  faGithub: any = faGithub;
  logo: string = "assets/batworks.png"
  showPassword: boolean = false;
  loginForm!: FormGroup

  constructor (
    private toastr: ToastrService,
    private service: LoginService,
    private auth: BatsworksApiService,
    private cookie: CookieService,
    private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(6)]),
    });
  }

  makeLogin(login: FormGroupDirective) {
    const { username, password } = login.control.value;
    if (String(password).length < 4) return;

    const user: Login = { username: username, password: password }
    this.auth.login(user).subscribe(
      (data: Token) => {
        this.cookie.set("auth", data.token, { expires: this.auth.authTime() });
        this.router.navigate([""]);
        this.service.isUserLogged(true)
      },
      (error: any) => {
        this.toastr.error(error.status, error.message)
      }
    )
  }

  githubLogin() {
    // window.location.href ="https://batsworks-timecard.onrender.com/batsworks/oauth2/authorization/github";
    // this.auth.loginGithub().subscribe(data => {
    //   console.log("github")
    //   console.table(data)
    //   console.log(data)
    // })
  }

}
