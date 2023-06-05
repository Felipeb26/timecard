import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor (
    private service: LoginService,
    private router: Router,
    private toast: ToastrService) { }

  canActivate() {
    if (this.service.isLogged()) {
      return true;
    } else {
      this.router.navigate(["login"])
      this.toast.error("Necessario se autenticar!")
      return false;
    }
  }

}
