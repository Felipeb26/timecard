import { Component, OnInit } from '@angular/core';
import { GithubApiService } from 'src/app/services/github-api.service';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.scss']
})
export class ContatoComponent implements OnInit{

  profile:any

  constructor (private apiGithub:GithubApiService){}

  ngOnInit(): void {
      this.apiGithub.getAllInformation().subscribe(data=> {
        this.profile = data.avatar_url
        console.log(data)
      })
  }
}
