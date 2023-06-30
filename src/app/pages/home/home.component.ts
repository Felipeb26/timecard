import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  marcando_ponto: string = "assets/marca_ponto.png";
  logo: string = "assets/batworks.png";
  constructor () { }

  ngOnInit(): void {

  }


}
