import { Component, OnInit } from '@angular/core';
import { faGithub, faLinkedin, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope,faPhone } from '@fortawesome/free-solid-svg-icons';
import { GithubApiService } from 'src/app/services/github-api.service';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.scss']
})
export class ContatoComponent implements OnInit {
  github = faGithub;
  linkedin = faLinkedin;
  whats = faWhatsapp;
  mail = faEnvelope;
  phone=faPhone;

  profile: any

  constructor (private apiGithub: GithubApiService) { }

  ngOnInit(): void {
    this.apiGithub.getAllInformation().subscribe(data => {
      this.profile = data.avatar_url
      console.log(data)
    })
  }
}
