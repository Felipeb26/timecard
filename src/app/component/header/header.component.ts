import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  logo: string = "assets/batworks.png";
  menuIsOpen: boolean = false;

  changeMenuState() {
    this.menuIsOpen = !this.menuIsOpen
    if (this.menuIsOpen) {
      setTimeout(() => {
        this.menuIsOpen = false;
      }, 3000)
    }
  }
}
