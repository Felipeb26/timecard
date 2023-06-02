import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubApiService {

  url:string="https://api.github.com/users/Felipeb26";

  constructor (private httpClient: HttpClient) { }

  getAllInformation():Observable<any>{
    return this.httpClient.get<any>(this.url);
  }

}
