import { Component, OnChanges, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  logo: string = "assets/batworks.png";
  menuIsOpen: boolean = false;
  showExit: boolean = true;

  constructor (
    private cdrf: ChangeDetectorRef,
    private service: LoginService,
    private cookie: CookieService,
    private route: Router) { }

  ngOnInit(): void {
    this.cdrf.detectChanges();
    this.service.userOn.subscribe(data => this.showExit = data);
    const cookie = this.cookie.get("auth");
    if (cookie.trim() == "" || cookie == null || cookie == undefined) {
      this.service.isUserLogged(false);
    } else {
      this.service.isUserLogged(true);
    }
  }

  exit() {
    this.service.isUserLogged(false);
    this.cookie.delete("auth");
    this.route.navigate(["login"])
  }
}
