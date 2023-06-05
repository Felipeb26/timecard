import { BatsworksApiService } from 'src/app/services/batsworks-api.service';
import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/interfaces/persona';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  persona!: Persona


  constructor (private request: BatsworksApiService) { }

  ngOnInit(): void {
    this.request.findPersona().subscribe(
      (data) => {
        console.log(data.content);
        this.persona = data.content[0];
      },
      (error: any) => {
        console.log(error.message);
      }
    )
  }
}
