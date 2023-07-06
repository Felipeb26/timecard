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
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

const oauthConfig: AuthConfig = {
  issuer: "https://batsworks-timecard.onrender.com/batsworks/oauth2/authorization/github",
  strictDiscoveryDocumentValidation: false,
  redirectUri: window.location.origin,
  clientId: "42079873f52c942cfc2f",
  scope: "openid profile email"
}

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
    private readonly oauthService: OAuthService,
    private toastr: ToastrService,
    private service: LoginService,
    private auth: BatsworksApiService,
    private cookie: CookieService,
    private router: Router) {

  }

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
        this.toastr.success("usuario autenticado")
      },
      (error: any) => {
        const { message, reason, timestamp, status } = error.error;
        console.log(error.error)
        this.toastr.error(reason, status)
      }
    )
  }

  githubLogin() {
    // this.oauthService.configure(oauthConfig);
    // this.oauthService.loadDiscoveryDocument().then(() => {
    //   this.oauthService.tryLoginImplicitFlow().then(() => {
    //     if (!this.oauthService.hasValidAccessToken()) {
    //       this.oauthService.initLoginFlow()
    //     } else {
    //       this.oauthService.loadUserProfile().then((user) => {
    //         console.log(JSON.stringify(user))
    //       })
    //     }
    //   })
    // }).catch((err) =>{
    //   console.log(err)
    // })
    // window.location.href ="https://batsworks-timecard.onrender.com/batsworks/oauth2/authorization/github";
    // this.auth.loginGithub().subscribe(data => {
    //   console.log("github")
    //   console.table(data)
    //   console.log(data)
    // })
  }

}
